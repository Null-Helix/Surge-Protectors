import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Table from 'react-bootstrap/Table';

export default function BatteryStat() {
  const currentUrl = window.location.href;
  const parts = currentUrl.split('/');
  const [hostName, setHostName] = useState(parts[parts.length - 1]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `http://127.0.0.1:5001/stat/${hostName}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log('Data', data);
      })
      .catch((error) => {
        console.error('Error fetching plot:', error);
      });
  }, [hostName]);

  const renderBoxPlots = () => {
    const statsToPlot = [
      'cycle',
      'temperature',
      'voltage',
      'current',
      'capacity',
    ];
    const boxPlots = [];

    for (const statName of statsToPlot) {
      const traces = [];
      let yAxisLabel = '';

      if (statName.toLowerCase() === 'temperature') {
        yAxisLabel = 'Temperature (°C)';
      } else if (statName.toLowerCase() === 'capacity') {
        yAxisLabel = 'Capacity (%)';
      } else if (statName.toLowerCase() === 'voltage') {
        yAxisLabel = 'Voltage (mV)';
      } else {
        yAxisLabel = 'Current (mA)';
      }

      for (const [device, stats] of Object.entries(data)) {
        const stat = stats[statName];
        const trace = {
          y: Object.values(stat),
          type: 'box',
          name: device,
          boxpoints: 'outliers',
        };
        traces.push(trace);
      }

      boxPlots.push(
        <div key={statName}>
          <h2>{statName}</h2>
          <Plot
            data={traces}
            layout={{
              title: `Box Plot for ${statName} across Devices`,
              yaxis: { title: yAxisLabel },
            }}
          />
        </div>
      );
    }
    return boxPlots;
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Battery Statistics</h1>
      </div>
      <div
        style={{
          paddingLeft: '150px',
          paddingTop: '40px',
          paddingBottom: '30px',
          display: 'flex',
        }}
      >
        <h5 style={{ display: 'flex' }}>
          <img
            src='/potrait_mobile.png'
            alt='Hub Photo'
            style={{ width: '200px', height: '200px', marginRight: '30px' }}
          />
          Hub Name: <p style={{ marginLeft: '10px' }}>{hostName}</p>
        </h5>
      </div>

      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Table striped hover style={{ maxWidth: '85%' }}>
          <thead style={{ background: '#f2f2f2' }}>
            <tr>
              <th>Device Type</th>
              <th>Temperature Status</th>
              <th>Voltage Status</th>
            </tr>
          </thead>
          <tbody style={{ background: 'white' }}>
            <tr>
              <td>Hub</td>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>SPO2 Sensor</td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
            <tr>
              <td>Respiratory Sensor</td>
              <td colSpan={2}>Larry the Bird</td>
            </tr>
          </tbody>
        </Table>
      </div>
      */}

      <section className='table__body'>
        <table>
          <thead>
            <tr>
              <th> Id </th>
              <th> Customer </th>
              <th> Location </th>
              <th> Order Date </th>
              <th> Status </th>
              <th> Amount </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> 1 </td>
              <td> Zinzu Chan Lee</td>
              <td> Seoul </td>
              <td> 17 Dec, 2022 </td>
              <td>
                <p className='status success'>Delivered</p>
              </td>
              <td>
                {' '}
                <strong> $128.90 </strong>
              </td>
            </tr>
            <tr>
              <td> 2 </td>
              <td>Jeet Saru </td>
              <td> Kathmandu </td>
              <td> 27 Aug, 2023 </td>
              <td>
                <p className='status danger'>Cancelled</p>
              </td>
              <td>
                {' '}
                <strong>$5350.50</strong>{' '}
              </td>
            </tr>
            <tr>
              <td> 3</td>
              <td> Sonal Gharti </td>
              <td> Tokyo </td>
              <td> 14 Mar, 2023 </td>
              <td>
                <p className='status normal'>Shipped</p>
              </td>
              <td>
                {' '}
                <strong>$210.40</strong>{' '}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {renderBoxPlots()}
        </div>
      </div>
    </>
  );
}
