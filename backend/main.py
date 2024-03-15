from flask import Flask, jsonify, Response
from flask_restful import Api, Resource
import pandas as pd
from werkzeug.contrib.cache import SimpleCache
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
api = Api(app)
cache = SimpleCache()

csvfile = "./BatteryTableAllLogs.csv"
hub_df = pd.read_csv(csvfile)

class HubInfo(Resource):
    def get(self, hostname, device, stat):

        print("hostname",hostname)
        print("device",device)
        print("stat",stat)

        cached_data = cache.get((hostname, device, stat))
        if cached_data:
            return Response(cached_data, mimetype='application/json')
        
        if device == "SPO2":
            device = "SPO2SENSOR"
        elif device == "RESP":
            device = "RESPSENSOR"

        filtered_data = hub_df[(hub_df['hostName'] == hostname) & 
                               (hub_df['device'] == device)]
        
        stat = stat.lower()

        desired_attributes = ["hostName", "device", "timestamp", stat]
        filtered_data = filtered_data[desired_attributes]
        
        # filtered_data = filtered_data.drop(columns=['id'])
        
        # outputfile = "./test.json"

        json_data = filtered_data.to_json(indent = 1, orient='records')
        print("dataLength: ", len(json_data))

        cache.set((hostname, device, stat), json_data)

        return Response(json_data, mimetype='application/json')
    
class HostName(Resource):
    def get(self):
        cached_data = cache.get('all_hostnames')
        if cached_data:
            return Response(cached_data, mimetype='application/json')

        hostnames = hub_df['hostName'].unique().tolist()
        print(hostnames)
        json_data = json.dumps(hostnames, indent=1)
        cache.set('all_hostnames', json_data)
        return Response(json_data, mimetype='application/json')

api.add_resource(HostName, "/hostnames")
api.add_resource(HubInfo, "/hubinfo/<string:hostname>/<string:device>/<string:stat>")

if __name__ == '__main__':
    app.run(debug=True, port=5001)