import React from 'react';
import { Table, Container } from 'react-bootstrap';
import './BatteryTable.css'; 

function BatteryDataTable() {
    // Static mock data
    const data = [
        { maxVoltage: 4058, avgVoltage: -18, maxCurrent: 1056, avgCurrent: 54, maxTemperature: 75 },
      
    ];


    return (
        <Container>
            <div className="table-row">
                <div className="blist">
                    <h3>Max Voltage</h3>
                    <div className="value-status">
                        <span className="table-number">4058 V</span>
                        <span className="condition">safe</span>
                    </div>
                </div>
                <div className="blist">
                    <h3>Avg Voltage</h3>
                    <div className="table-number">-18.536 A</div>
                </div>
                <div className="blist">
                    <h3>Avg Current</h3>
                    <div className="table-number">54 A</div>
                </div>
                <div className="blist">
                    <h3>Max Temp</h3>
                    <div className="value-status">
                        <span className="table-number">39 °C</span>
                        <span className="condition">safe</span>
                    </div>
                </div>
            </div>
        </Container>
    );
}
      

export default BatteryDataTable;
