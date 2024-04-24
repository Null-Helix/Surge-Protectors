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
from datetime import datetime
import seaborn as sns

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)
cache = SimpleCache()

csvfile = os.path.join(".", "BatteryTableAllLogs.csv")
hub_df = pd.read_csv(csvfile)
matplotlib.use('Agg') 

def calculate_jump_clusters(group):
    capacity_diff = group["capacity"] - group["capacity"].shift(fill_value=group["capacity"].iloc[0])
    jump_clusters = (capacity_diff > 5).cumsum()
    
    group["jump_cluster"] = jump_clusters

    return group

def convert_minutes_to_hours_minutes(minutes):
    hours = minutes // 60
    remaining_minutes = minutes % 60
    return f"{int(hours)}h {int(remaining_minutes)}m"
    
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

        desired_attributes = ["timestamp", "cycle", stat]
        filtered_data = filtered_data[desired_attributes]

        max_points_to_display = 10000
        if len(filtered_data) > max_points_to_display:
            filtered_data = filtered_data.sample(n=max_points_to_display)

        filtered_data.sort_values(by='timestamp', inplace=True)

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
    
class LogDataInfo(Resource):
    def get(self):
        file_path = 'logData.txt'
        data = {}

        with open(file_path, 'r') as file:
            lines = file.readlines()
        
        for line in lines:
            if line.startswith('Rows in logs:'):
                data['Rows_in_log_files'] = int(line.split(': ')[1].strip())
            elif line.startswith('Unique battery logs:'):
                data['Unique_battery_logs'] = int(line.split(': ')[1].strip())
            elif line.startswith('Before parsing:'):
                data['Data_size_before_parsing'] = line.split(': ')[1].strip()
            elif line.startswith('After parsing:'):
                data['Data_size_after_parsing'] = line.split(': ')[1].strip()
        
        json_data = json.dumps(data, indent=4)
        return Response(json_data, mimetype='application/json')

class StatFiveNumberSummary(Resource):
    def get(self, hostname):

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

class CycleTimeStampData(Resource):
    def get(self, hostname):
        filtered_data = hub_df[(hub_df['hostName'] == hostname)]
        desired_attributes = ["timestamp", "cycle", 'capacity']
        filtered_data = filtered_data[desired_attributes]

        max_points_to_display = 10000
        if len(filtered_data) > max_points_to_display:
            filtered_data = filtered_data.sample(n=max_points_to_display)
        
        filtered_data.sort_values(by='timestamp', inplace=True)

        json_data = filtered_data.to_json(indent = 1, orient='records')
        return Response(json_data, mimetype='application/json')

class Stat(Resource):
    def get(self, hostname):

        filtered_data = hub_df[(hub_df['hostName'] == hostname)]

        data = {}

        ## need to find max and min voltage
        ## max temperature 
        ## earliest start date of the log
        ## latest date of the log
        max_voltage = filtered_data['voltage'].max()
        min_voltage = filtered_data['voltage'].min()
        max_temperature = filtered_data['temperature'].max()
        min_date = filtered_data['timestamp'].min()
        max_date = filtered_data['timestamp'].max()
        min_datetime = datetime.strptime(min_date, '%Y-%m-%dT%H:%M:%S.%f')
        max_datetime = datetime.strptime(max_date, '%Y-%m-%dT%H:%M:%S.%f')

        # Format dates as required (day month year)
        earliest_date = min_datetime.strftime('%-d %b %Y')
        latest_date = max_datetime.strftime('%-d %b %Y')

        ## group by device find average temperature, capacity and maximum cycle  
        grouped_data = filtered_data.groupby('device').agg({
            'temperature': ['mean', 'max', 'min'],
            'voltage': ['max', 'min'],
            'capacity': 'mean',
            'cycle': 'max',
            'timestamp': ['min', 'max']
        })

        device_stats = {}
        for device, stats in grouped_data.iterrows():
            device_stats[device] = {
                'average_temperature': float(stats['temperature']['mean']),
                'max_temperature': float(stats['temperature']['max']),
                'min_temperature': float(stats['temperature']['min']),
                'max_voltage': float(stats['voltage']['max']),
                'min_voltage': float(stats['voltage']['min']),
                'average_capacity': float(stats['capacity']),
                'max_cycle': int(stats['cycle'])
            }

        json_serializable_data = {
            'max_voltage': float(max_voltage),
            'min_voltage': float(min_voltage),
            'max_temperature': float(max_temperature),
            'earliest_date': str(earliest_date),  
            'latest_date': str(latest_date),  
            'device_stats': device_stats
        }

        # Serialize data to JSON
        json_data = json.dumps(json_serializable_data)
       
        return Response(json_data, mimetype='application/json')
    
class DischargeDataPerHost(Resource):
    def get(self, hostname):
        
        cached_response = cache.get(hostname + "discharge")

        if cached_response:
            return jsonify(cached_response)
        
        clustered_df = hub_df[(hub_df["hostName"] == hostname)]

        clustered_df = (
            clustered_df
            .sort_values(by=["hostName", "device", "timestamp"])
        )

        print(clustered_df)

        clustered_df.loc[: , 'timestamp'] = pd.to_datetime(clustered_df['timestamp'])

        filtered_df_spo2 = clustered_df[(clustered_df["device"] == "SPO2SENSOR")]
        if filtered_df_spo2.empty:
            return

        filtered_df_resp = clustered_df[(clustered_df["device"] == "RESPSENSOR")]

        spo2_cluster_lengths = (
            filtered_df_spo2
            .groupby(["hostName", "cycle"])
            .agg(
                mins=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 60),
                hours=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 3600)
            )
            .reset_index()
        )

        resp_cluster_lengths = (
            filtered_df_resp
            .groupby(["hostName", "cycle"])
            .agg(
                mins=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 60),
                hours=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 3600)
            )
            .reset_index()
        )

        min_hours_resp = convert_minutes_to_hours_minutes(resp_cluster_lengths['mins'].min())
        max_hours_resp = convert_minutes_to_hours_minutes(resp_cluster_lengths['mins'].max())
        min_hours_spo2 = convert_minutes_to_hours_minutes(spo2_cluster_lengths['mins'].min())
        max_hours_spo2 = convert_minutes_to_hours_minutes(spo2_cluster_lengths['mins'].max())

        response_data = {
            "min_minutes_resp": min_hours_resp,
            "max_minutes_resp": max_hours_resp,
            "min_minutes_spo2": min_hours_spo2,
            "max_minutes_spo2": max_hours_spo2,
        }

        cache.set(hostname + "discharge", response_data)

        return jsonify(response_data)
    
class WholeDischargeData(Resource):
    def get(self):
        cached_response = cache.get("WholeDischarge")
        if cached_response:
            return jsonify(cached_response)
        
        clustered_df = (
            hub_df
            .sort_values(by=["hostName", "device", "timestamp"])
        )

        clustered_df.loc[: , 'timestamp'] = pd.to_datetime(clustered_df['timestamp'])

        filtered_df_spo2 = clustered_df[(clustered_df["device"] == "SPO2SENSOR")]
        
        spo2_cluster_lengths = (
            filtered_df_spo2
            .groupby(["hostName", "cycle"])
            .agg(
                mins=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 60),
                hours=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 3600)
            )
            .reset_index()
        )

        print("Cluter", spo2_cluster_lengths)

        response_data = {
            "spo2_data": spo2_cluster_lengths
        }

        return jsonify(response_data)

api.add_resource(Plot, "/plot/<string:hostname>/<string:device>/<string:stat>", "/plot/<string:hostname>/<string:device>/<string:stat>/<string:dischargeCycle>")
api.add_resource(HubInfo, "/hubinfo/<string:hostname>/<string:device>/<string:stat>", "/hubinfo/<string:hostname>/<string:device>/<string:stat>/<string:dischargeCycle>")
api.add_resource(HostName, "/hostnames")
api.add_resource(LogDataInfo, "/loginfo")
api.add_resource(StatFiveNumberSummary, "/stat_five_number_summary/<string:hostname>")
api.add_resource(Stat, "/stat/<string:hostname>")
api.add_resource(CycleTimeStampData, "/cycle_timestamp/<string:hostname>")
api.add_resource(DischargeDataPerHost, "/discharge/<string:hostname>")
api.add_resource(WholeDischargeData, "/whole_discharge")

if __name__ == '__main__':
    app.run(debug=True, port=5001)