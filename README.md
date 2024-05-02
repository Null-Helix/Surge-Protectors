# CS 639 README file

#### Partner: GE Health

#### Team Name: Surge Protector

#### Team Member: Avicenna Tirtosuharto, Jacob Dorning, Joshua Kercher, Wai Zin Linn, Yingjie Dai

#### Link to repository

https://github.com/Null-Helix/Surge-Protectors/tree/main

### Set-up steps:

Clone the repository

Navigate to the backend diretory

Extract the csv file from BatteryTableAllLogs.zip

Run `pip3 install -r requirements.txt (on mac)`

Run `python3 main.py (on mac)`

Navigate to the frontend directory

Run `npm install` (v10.2.4)

Run `npm run dev`

In your web browser, go to http://localhost:5173, where the frontend application is hosted. The backend is http://localhost:5001.


### How the code works:

This repository stores a frontend and backend to analyze parsed battery data from GE HealthCare's Portrait Mobile patient monitoring system.

The backend is through Python Flask (v3.0.3)

The frontend is through React.

The parser to clean up log files is written in Python.

The data analysis pieces are done using R and Python.

### What works:

Visualization of parsed battery data in scatter or line graph form.

Slicing of that data by periods of continuous discharging to identify a single
battery charge.

Statistical analysis page of hostnames through search feature.

Information about battery status at stat page.

Summary about amount of data we have processed at the landing page.


### What doesn't work:

Histogram showing the battery usage for RESP and SPO2 sensor at frontend.

Scatter plot to compare different discharge cycles of RESP/SPO2 at stat page.
