"""
FILE: log_parser.py
------------------
Author: Joshua Kercher

Log parser for GE HealthCare battery logs. Creates a .csv file with schema "hostName, device, timestamp, temp, voltage, current, capacity"
Command line useage: "python log_parser.py <log file name>"
To run parser on multiple files: "python log_parser.py <folder name with log files>/*"

"""
import sys
from json import loads
import pandas as pd

"""
Returns true if a file ends in .csv
"""
def isLog(f):
    return len(f) > 4 and f[-4:] == '.csv'
"""
Parses a single csv file, adding entries to .dat files as it progresses.
"""
def parseLog(log_file, table):
    log = pd.read_csv(log_file)
    log = log[log['eventCategory'] == 'PerfData'].reset_index()
    for i in range(log.shape[0]):
        PerfData = loads(log['description'][i])['PerfData']
        for data in PerfData:
            if ('B.STATE.V' in data.keys()):
                key = (log['hostName'][i], data['resource'][8:], data['timestamp'][0:23])
                if key not in table:
                    table[key] = {'hostName': log['hostName'][i], 'device': data['resource'][8:], 'timestamp': data['timestamp'][0:23], 
                                  'temp': None, 'voltage': None, 'current': None, 'capacity': None}
                table[key]['voltage'] = data['B.STATE.V']
            if ('B.STATE.I' in data.keys()):
                key = (log['hostName'][i], data['resource'][8:], data['timestamp'][0:23])
                if key not in table:
                    table[key] = {'hostName': log['hostName'][i], 'device': data['resource'][8:], 'timestamp': data['timestamp'][0:23], 
                                  'temp': None, 'voltage': None, 'current': None, 'capacity': None}
                table[key]['current'] = data['B.STATE.I']
            if ('B.STATE.ETMP' in data.keys()):
                key = (log['hostName'][i], data['resource'][8:], data['timestamp'][0:23])
                if key not in table:
                    table[key] = {'hostName': log['hostName'][i], 'device': data['resource'][8:], 'timestamp': data['timestamp'][0:23], 
                                  'temp': None, 'voltage': None, 'current': None, 'capacity': None}
                table[key]['temp'] = data['B.STATE.ETMP']
            if ('B.STATE.CHRG' in data.keys()):
                key = (log['hostName'][i], data['resource'][8:], data['timestamp'][0:23])
                if key not in table:
                    table[key] = {'hostName': log['hostName'][i], 'device': data['resource'][8:], 'timestamp': data['timestamp'][0:23], 
                                  'temp': None, 'voltage': None, 'current': None, 'capacity': None}
                table[key]['capacity'] = data['B.STATE.CHRG']
"""
Loops through each csv file provided on the command line and passes each file
to the parser
"""
def main(argv):
    if len(argv) < 2:
        print('Usage: python log_parser.py <path to log files>', file=sys.stderr)
        sys.exit(1)
    table = {}
    for f in argv[1:]:
        if isLog(f):
            parseLog(f, table)
            print("Success parsing " + f)
    batteryTable = open('batteryTable.csv', 'w')
    batteryTable.write(','.join(['hostName', 'device', 'timestamp', 'temperature', 'voltage', 'current', 'capacity']) + '\n')
    for line in table.values():
        new_line = ','.join([line['hostName'], line['device'], line['timestamp'], str(line['temp']), str(line['voltage']), str(line['current']), str(line['capacity'])]) + '\n'
        batteryTable.write(new_line)
    batteryTable.close()

if __name__ == '__main__':
    main(sys.argv)
