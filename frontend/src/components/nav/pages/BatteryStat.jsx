import { useState, useEffect, useContext } from 'react';
import Plot from 'react-plotly.js';
import HostNameContext from '../../contexts/HostNameContext';

export default function BatteryStat() {
  const [hostName, setHostName] = useContext(HostNameContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `http://127.0.0.1:5001/stat/${hostName}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
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
          flexDirection: 'column',
        }}
      >
        <h5 style={{ display: 'flex' }}>
          <img
            src='/potrait_mobile.png'
            alt='Hub Photo'
            style={{ width: '200px', height: '200px', marginRight: '30px' }}
          />
          <div>
            <div style={{ flexDirection: 'column' }}>
              <p style={{ margin: '10px' }}>
                <strong>Hub Name:</strong> {hostName}
              </p>
            </div>
            <div>
              <p style={{ margin: '10px', paddingTop: '12px' }}>
                <strong>Device Anomaly:</strong> 1
              </p>
            </div>
          </div>
        </h5>

        <section
          className='table__body'
          style={{
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '15px',
          }}
        >
          <table>
            <thead>
              <tr>
                <th> Devices </th>
                <th> Average Temperature </th>
                <th> Average Voltage </th>
                <th> Cycle Count </th>
                <th
                  style={{
                    paddingRight: '20px',
                    textAlign: 'center',
                  }}
                >
                  {' '}
                  Condition{' '}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src='/hub.png'
                    alt='Hub Image'
                    style={{
                      width: '50px',
                      marginRight: '10px',
                      height: '40px',
                    }}
                  />
                  Hub
                </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td>
                  <p className='status success'>Safe</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src='/resp.png'
                    alt='Hub Image'
                    style={{
                      width: '50px',
                      marginRight: '10px',
                      height: '40px',
                    }}
                  />
                  Respiratory Sensor
                </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td>
                  <p className='status danger'>Danger</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src='/sp.png'
                    alt='Hub Image'
                    style={{
                      width: '50px',
                      marginRight: '10px',
                      height: '40px',
                    }}
                  />
                  SPO2 Sensor
                </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td>
                  <p className='status success'>Safe</p>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
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
