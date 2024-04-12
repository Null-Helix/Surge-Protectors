import { useState, useEffect, useContext } from 'react';
import Plot from 'react-plotly.js';
import HostNameContext from '../../contexts/HostNameContext';

export default function BatteryStat() {
  const [hostName, setHostName] = useContext(HostNameContext);
  const [data, setData] = useState([]);
  const [stat, setStat] = useState([]);
  const [anomalyCount, setAnomalyCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const five_num_url = `http://127.0.0.1:5001/stat_five_number_summary/${hostName}`;
        const stat_url = `http://127.0.0.1:5001/stat/${hostName}`;

        const responseFiveNum = await fetch(five_num_url);
        const dataFiveNum = await responseFiveNum.json();
        setData(dataFiveNum);

        const responseStat = await fetch(stat_url);
        const dataStat = await responseStat.json();
        setStat(dataStat);

        console.log('Stat:', dataStat);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
        <h1 className='animate-character'>Battery Statistics</h1>
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* Leftmost Column (Image) */}
          <img
            src='/potrait_mobile.png'
            alt='Hub Photo'
            style={{ width: '200px', height: '200px', marginRight: '30px' }}
          />

          {/* Middle Column */}
          <div style={{ flex: 1, flexDirection: 'column' }}>
            {/* Top Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* Left Column in Middle */}
              <div
                style={{
                  flex: 1,
                  maxWidth: '640px',
                  flexDirection: 'column',
                }}
              >
                <p>
                  <strong
                    style={{
                      fontSize: '20px',
                      lineHeight: '1.5',
                      color: '#0047ab',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0, 123, 255, 0.3)',
                      marginRight: '10px',
                    }}
                  >
                    Hub Name:
                  </strong>
                  <span
                    style={{
                      fontSize: '20px',
                      fontWeight: 'normal',
                    }}
                  >
                    {hostName}
                  </span>
                </p>
                <p style={{ paddingTop: '12px' }}>
                  <strong
                    style={{
                      color: 'black',
                      fontSize: '20px',
                      textShadow:
                        '0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000, 0 0 20px #ff0000',
                      marginRight: '8px',
                    }}
                  >
                    Device Anomaly:
                  </strong>{' '}
                  <span
                    style={{
                      fontSize: '20px',
                      fontWeight: 'normal',
                    }}
                  >
                    {anomalyCount}
                  </span>
                </p>
              </div>

              {/* Right Column in Middle */}
              <div
                style={{ flex: 1, marginLeft: '6px', flexDirection: 'column' }}
              >
                <div
                  style={{
                    marginBottom: '20px',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '16px',
                    lineHeight: '1.5',
                  }}
                >
                  <p>
                    <strong
                      style={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        marginRight: '5px',
                        color: '#650acd',
                      }}
                    >
                      Log Analysis Start Date:
                    </strong>
                    <span
                      style={{
                        fontSize: '20px',
                        fontWeight: 'normal',
                        color: '#333',
                      }}
                    >
                      {stat ? <>{stat.earliest_date}</> : <>None</>}
                    </span>
                  </p>
                </div>
                <div
                  style={{
                    marginBottom: '20px',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '16px',
                    lineHeight: '1.5',
                  }}
                >
                  <p>
                    <strong
                      style={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        marginRight: '5px',
                        color: '#6b7a7e',
                        textShadow: '0 0 10px rgba(107, 122, 126, 0.5)',
                      }}
                    >
                      Log Analysis Latest Date:
                    </strong>

                    <span
                      className='smoky-text'
                      style={{
                        fontSize: '20px',
                        fontWeight: 'normal',
                      }}
                    >
                      {stat ? <>{stat.latest_date}</> : <>None</>}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                <th style={{ paddingLeft: 0 }}> Average Temperature </th>
                <th style={{ paddingLeft: 0 }}> Average Capacity </th>
                <th style={{ paddingLeft: 0 }}> Cycle Count </th>
                <th
                  style={{
                    paddingRight: '20px',
                    textAlign: 'center',
                  }}
                >
                  Condition
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
                <td style={{ paddingLeft: 0 }}>
                  <p style={{ paddingLeft: 24 }}>
                    {stat && stat.device_stats && stat.device_stats.HUB
                      ? `${stat.device_stats.HUB.average_temperature.toFixed(
                          2
                        )} °C`
                      : 'No Data'}
                  </p>
                </td>
                <td style={{ paddingLeft: 0 }}>
                  <p style={{ paddingLeft: 24 }}>
                    {stat && stat.device_stats && stat.device_stats.HUB
                      ? `${stat.device_stats.HUB.average_capacity.toFixed(2)} %`
                      : 'No Data'}
                  </p>
                </td>
                <td style={{ paddingLeft: 0 }}>
                  {stat && stat.device_stats && stat.device_stats.HUB ? (
                    <p style={{ paddingLeft: 40 }}>
                      {stat.device_stats.HUB.max_cycle}
                    </p>
                  ) : (
                    <p style={{ paddingLeft: 28 }}>No Data</p>
                  )}
                </td>
                <td>
                  {!stat ? (
                    <p className='status unknown'>Unknown</p>
                  ) : !stat.device_stats || !stat.device_stats.HUB ? (
                    <p className='status unknown'>Unknown</p>
                  ) : (
                    (() => {
                      const { max_temperature, min_voltage, max_voltage } =
                        stat.device_stats.HUB;
                      let statusClass = 'status success';

                      if (
                        max_temperature > 43 ||
                        min_voltage < 2850 ||
                        max_voltage > 4250
                      ) {
                        statusClass = 'status danger';
                        setAnomalyCount((prevCount) => prevCount + 1);
                      }

                      return (
                        <p className={statusClass}>
                          {statusClass === 'status danger' ? 'Danger' : 'Safe'}
                        </p>
                      );
                    })()
                  )}
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
                <td style={{ paddingLeft: 0 }}>
                  <p style={{ paddingLeft: 24 }}>
                    {stat && stat.device_stats && stat.device_stats.RESPSENSOR
                      ? `${stat.device_stats.RESPSENSOR.average_temperature.toFixed(
                          2
                        )} °C`
                      : 'No Data'}
                  </p>
                </td>
                <td style={{ paddingLeft: 0 }}>
                  {' '}
                  <p style={{ paddingLeft: 24 }}>
                    {stat && stat.device_stats && stat.device_stats.RESPSENSOR
                      ? `${stat.device_stats.RESPSENSOR.average_capacity.toFixed(
                          2
                        )} %`
                      : 'No Data'}
                  </p>
                </td>
                <td style={{ paddingLeft: 0 }}>
                  {stat && stat.device_stats && stat.device_stats.RESPSENSOR ? (
                    <p style={{ paddingLeft: 40 }}>
                      {stat.device_stats.RESPSENSOR.max_cycle}
                    </p>
                  ) : (
                    <p style={{ paddingLeft: 28 }}>No Data</p>
                  )}
                </td>
                <td>
                  {!stat ? (
                    <p className='status unknown'>Unknown</p>
                  ) : !stat.device_stats || !stat.device_stats.RESPSENSOR ? (
                    <p className='status unknown'>Unknown</p>
                  ) : (
                    (() => {
                      const { max_temperature, min_voltage, max_voltage } =
                        stat.device_stats.RESPSENSOR;
                      let statusClass = 'status success';

                      if (
                        max_temperature > 43 ||
                        min_voltage < 2850 ||
                        max_voltage > 4250
                      ) {
                        statusClass = 'status danger';
                        setAnomalyCount((prevCount) => prevCount + 1);
                      }

                      return (
                        <p className={statusClass}>
                          {statusClass === 'status danger' ? 'Danger' : 'Safe'}
                        </p>
                      );
                    })()
                  )}
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
                <td style={{ paddingLeft: 0 }}>
                  <p style={{ paddingLeft: 24 }}>
                    {stat && stat.device_stats && stat.device_stats.SPO2SENSOR
                      ? `${stat.device_stats.SPO2SENSOR.average_temperature.toFixed(
                          2
                        )} °C`
                      : 'No Data'}
                  </p>
                </td>
                <td style={{ paddingLeft: 0 }}>
                  {' '}
                  <p style={{ paddingLeft: 24 }}>
                    {stat && stat.device_stats && stat.device_stats.SPO2SENSOR
                      ? `${stat.device_stats.SPO2SENSOR.average_capacity.toFixed(
                          2
                        )} %`
                      : 'No Data'}
                  </p>
                </td>
                <td style={{ paddingLeft: 0 }}>
                  {stat && stat.device_stats && stat.device_stats.SPO2SENSOR ? (
                    <p style={{ paddingLeft: 40 }}>
                      {stat.device_stats.SPO2SENSOR.max_cycle}
                    </p>
                  ) : (
                    <p style={{ paddingLeft: 28 }}>No Data</p>
                  )}
                </td>
                <td>
                  {!stat ? (
                    <p className='status unknown'>Unknown</p>
                  ) : !stat.device_stats || !stat.device_stats.SPO2SENSOR ? (
                    <p className='status unknown'>Unknown</p>
                  ) : (
                    (() => {
                      const { max_temperature, min_voltage, max_voltage } =
                        stat.device_stats.SPO2SENSOR;
                      let statusClass = 'status success';

                      if (
                        max_temperature > 43 ||
                        min_voltage < 2850 ||
                        max_voltage > 4250
                      ) {
                        statusClass = 'status danger';
                        setAnomalyCount((prevCount) => prevCount + 1);
                      }

                      return (
                        <p className={statusClass}>
                          {statusClass === 'status danger' ? 'Danger' : 'Safe'}
                        </p>
                      );
                    })()
                  )}
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
