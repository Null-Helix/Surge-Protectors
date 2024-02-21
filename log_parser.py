"""
FILE: log_parser.py
------------------
Author: Joshua Kercher

Log parser for GE HealthCare battery logs. Creates four .dat files with schema "hostName, device, timestamp, temp/voltage/current/capacity"
Command line useage: "python3 log_parser.py <log file name>"

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
def parseLog(log_file, tempTable, voltageTable, currentTable, capacityTable):
    log = pd.read_csv(log_file)
    log = log[log['eventCategory'] == 'PerfData'].reset_index()
    for i in range(log.shape[0]):
        PerfData = loads(log['description'][i])['PerfData']
        for data in PerfData:
            if ('B.STATE.V' in data.keys()):
                voltageTable.write(log['hostName'][i] + "|" + data['resource'][8:] + "|" + data['timestamp'][0:23] + "|" + str(data['B.STATE.V']) + "\n")
            if ('B.STATE.I' in data.keys()):
                currentTable.write(log['hostName'][i] + "|" + data['resource'][8:] + "|" + data['timestamp'][0:23] + "|" + str(data['B.STATE.I']) + "\n")
            if ('B.STATE.ETMP' in data.keys()):
                tempTable.write(log['hostName'][i] + "|" + data['resource'][8:] + "|" + data['timestamp'][0:23] + "|" + str(data['B.STATE.ETMP']) + "\n")
            if ('B.STATE.CHRG' in data.keys()):
                capacityTable.write(log['hostName'][i] + "|" + data['resource'][8:] + "|" + data['timestamp'][0:23] + "|" + str(data['B.STATE.CHRG']) + "\n")
"""
Loops through each csv file provided on the command line and passes each file
to the parser
"""
def main(argv):
    if len(argv) < 2:
        print('Usage: python log_parser.py <path to log files>', file=sys.stderr)
        sys.exit(1)
    tempTable = open("tempTable.dat", "w")
    voltageTable = open("voltageTable.dat", "w")
    currentTable = open("currentTable.dat", "w")
    capacityTable = open("capacityTable.dat", "w")
    for f in argv[1:]:
        if isLog(f):
            parseLog(f, tempTable, voltageTable, currentTable, capacityTable)
            print("Success parsing " + f)
    tempTable.close()
    voltageTable.close()
    currentTable.close()
    capacityTable.close()

if __name__ == '__main__':
    main(sys.argv)
