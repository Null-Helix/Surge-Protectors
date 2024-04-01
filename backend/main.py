from flask import Flask, jsonify, Response, send_file, send_from_directory
import io
from flask_restful import Api, Resource
import pandas as pd
from werkzeug.contrib.cache import SimpleCache
from flask_cors import CORS
import matplotlib.pyplot as plt
import matplotlib
from io import BytesIO
import json
import os
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)
cache = SimpleCache()

csvfile = os.path.join(".", "BatteryTableAllLogs.csv")
hub_df = pd.read_csv(csvfile)
matplotlib.use('Agg') 
    
class Plot(Resource):
    def get(self, hostname, device, stat, dischargeCycle = None):

        if device == "SPO2":
            device = "SPO2SENSOR"
        elif device == "RESP":
            device = "RESPSENSOR"

        filtered_data = hub_df[(hub_df['hostName'] == hostname) & 
                               (hub_df['device'] == device)]
        
        if dischargeCycle is not None:
            # filter down the sepcific hostName, device chosen by user to a discharge cycle user specified
            filtered_data = filtered_data[filtered_data["cycle"] == dischargeCycle]
        
        filtered_data = filtered_data.copy()
        filtered_data['timestamp'] = pd.to_datetime(filtered_data['timestamp'])

        title = f"{hostname} - {device} - {stat}"
        plt.figure(figsize=(10, 6))
        plt.gcf().subplots_adjust(bottom=0.15)
        plt.title(title)
        plt.xticks(rotation=35)

        stat = stat.lower()

        max_points_to_display = 10000
        if len(filtered_data) > max_points_to_display:
            sampled_data = filtered_data.sample(n=max_points_to_display)
        else:
            sampled_data = filtered_data

        plt.scatter(filtered_data["timestamp"], filtered_data[stat], marker='o', s=1, alpha=0.5)
        plt.xlabel('Date')

        if stat == "temperature":
            plt.ylabel('Temperature (°C)')
        elif stat == "capcity":
            plt.ylabel('Capacity (%)')
        elif stat == "voltage":
            plt.ylabel('Voltage (mV)')
        else:
            # current
            plt.ylabel('Current (mA)')

        buffer = BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)  
        plt.close()

        return send_file(buffer, mimetype='image/png')

class HubInfo(Resource):
    def get(self, hostname, device, stat, dischargeCycle = None):

        print("hostname",hostname)
        print("device",device)
        print("stat",stat)
        print("dischargeCycle", dischargeCycle)

        cached_data = cache.get((hostname, device, stat))
        if cached_data:
            return Response(cached_data, mimetype='application/json')
        
        if device == "SPO2":
            device = "SPO2SENSOR"
        elif device == "RESP":
            device = "RESPSENSOR"

        filtered_data = hub_df[(hub_df['hostName'] == hostname) & 
                               (hub_df['device'] == device)]
        
        if dischargeCycle is not None:
            # filter down the sepcific hostName, device chosen by user to a discharge cycle user specified
            filtered_data = filtered_data[filtered_data["cycle"] == int(dischargeCycle)]

        stat = stat.lower()

        desired_attributes = ["timestamp", stat]
        filtered_data = filtered_data[desired_attributes]

        max_points_to_display = 10000
        if len(filtered_data) > max_points_to_display:
            filtered_data = filtered_data.sample(n=max_points_to_display)

        json_data = filtered_data.to_json(indent = 1, orient='records')

        cache.set((hostname, device, stat), json_data)

        return Response(json_data, mimetype='application/json')
    
class HostName(Resource):
    def get(self):
        cached_data = cache.get('all_hostnames')
        if cached_data:
            return Response(cached_data, mimetype='application/json')

        hostnames = hub_df['hostName'].unique().tolist()
        json_data = json.dumps(hostnames, indent=1)
        cache.set('all_hostnames', json_data)
        return Response(json_data, mimetype='application/json')

class Stat(Resource):
    def get(self, hostname):
        print("Stat hostname", hostname)

        filtered_data = hub_df[(hub_df['hostName'] == hostname)]

        grouped_data = filtered_data.groupby('device')
       
        summaries = {}
        for device, group in grouped_data:
            summary_stats = group.describe(percentiles=[.25, .5, .75])
            cycle_info = {
                'min': summary_stats['cycle']['min'],
                '25th percentile': summary_stats['cycle']['25%'],
                'median': summary_stats['cycle']['50%'],
                '75th percentile': summary_stats['cycle']['75%'],
                'max': summary_stats['cycle']['max']
            }
            temperature_info = {
                'min': summary_stats['temperature']['min'],
                '25th percentile': summary_stats['temperature']['25%'],
                'median': summary_stats['temperature']['50%'],
                '75th percentile': summary_stats['temperature']['75%'],
                'max': summary_stats['temperature']['max']
            }
            voltage_info = {
                'min': summary_stats['voltage']['min'],
                '25th percentile': summary_stats['voltage']['25%'],
                'median': summary_stats['voltage']['50%'],
                '75th percentile': summary_stats['voltage']['75%'],
                'max': summary_stats['voltage']['max']
            }
            current_info = {
                'min': summary_stats['current']['min'],
                '25th percentile': summary_stats['current']['25%'],
                'median': summary_stats['current']['50%'],
                '75th percentile': summary_stats['current']['75%'],
                'max': summary_stats['current']['max']
            }
            capacity_info = {
                'min': summary_stats['capacity']['min'],
                '25th percentile': summary_stats['capacity']['25%'],
                'median': summary_stats['capacity']['50%'],
                '75th percentile': summary_stats['capacity']['75%'],
                'max': summary_stats['capacity']['max']
            }
            summaries[device] = {
                'cycle': cycle_info,
                'temperature': temperature_info,
                'voltage': voltage_info,
                'current': current_info,
                'capacity': capacity_info
            }

        return jsonify(summaries)


api.add_resource(Plot, "/plot/<string:hostname>/<string:device>/<string:stat>", "/plot/<string:hostname>/<string:device>/<string:stat>/<string:dischargeCycle>")
api.add_resource(HubInfo, "/hubinfo/<string:hostname>/<string:device>/<string:stat>", "/hubinfo/<string:hostname>/<string:device>/<string:stat>/<string:dischargeCycle>")
api.add_resource(HostName, "/hostnames")
api.add_resource(Stat, "/stat/<string:hostname>")

if __name__ == '__main__':
    app.run(debug=True, port=5001)