import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import {
  LineChart,
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  Scatter,
  Label,
  Tooltip,
  Legend,
} from 'recharts';

export default function BatteryLanding() {
  const [hostname, setHostname] = useState('44-4b-5d-01-04-19');
  const [device, setDevice] = useState('SPO2');
  const [stat, setStat] = useState('Temperature');
  const [dischargeCycle, setDischargeCycle] = useState(1);
  const [dischargeCycleToggle, setDischargeCycleToggle] = useState(false);
  const [minStat, setMinStat] = useState(0);
  const [maxStat, setMaxStat] = useState(0);
  const [batteryData, setBatteryData] = useState([]);
  const [plotImage, setPlotImage] = useState(null);
  const [yLabel, setYLabel] = useState(null);
  const [plot, setPlot] = useState('plot');

  async function getData() {
    try {
      console.log('Data', hostname, device, stat, dischargeCycle);

      let url = `http://127.0.0.1:5001/hubinfo/${hostname}/${device}/${stat}`;

      if (dischargeCycleToggle) {
        console.log('Executed');
        console.log('DischargeCycle', dischargeCycle);
        url = `http://127.0.0.1:5001/hubinfo/${hostname}/${device}/${stat}/${dischargeCycle}`;
      }

      const response = await fetch(url, {
        method: 'GET',
      });

      const result = await response.json();
      setBatteryData(result);

      if (result) {
        let minStatistic = result[0][stat.toLowerCase()];
        let maxStatistic = result[0][stat.toLowerCase()];

        result.forEach((data) => {
          if (data[stat.toLowerCase()] < minStatistic) {
            minStatistic = data[stat.toLowerCase()];
          }
          if (data[stat.toLowerCase()] > maxStatistic) {
            maxStatistic = data[stat.toLowerCase()];
          }
        });

        setMinStat(minStatistic);
        setMaxStat(maxStatistic);

        let yAxisLabel;
        if (stat.toLowerCase() === 'temperature') {
          yAxisLabel = 'Temperature (°C)';
        } else if (stat.toLowerCase() === 'capacity') {
          yAxisLabel = 'Capacity (%)';
        } else if (stat.toLowerCase() === 'voltage') {
          yAxisLabel = 'Voltage (mV)';
        } else {
          yAxisLabel = 'Current (mA)';
        }

        setYLabel(yAxisLabel);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {}, [plot]);

  function getPlot() {
    let url = `http://127.0.0.1:5001/plot/${hostname}/${device}/${stat}`;

    if (dischargeCycleToggle) {
      url = `http://127.0.0.1:5001/plot/${hostname}/${device}/${stat}/${dischargeCycle}`;
    }

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const imageURL = URL.createObjectURL(blob);
        setPlotImage(imageURL);
      })
      .catch((error) => {
        console.error('Error fetching plot:', error);
      });

    return () => {
      if (plotImage) {
        URL.revokeObjectURL(plotImage);
      }
    };
  }

  useEffect(() => {
    getData();
    // getPlot();
  }, [hostname, device, stat]);

  // useEffect(() => {
  //   getData();
  // }, [hostname, device, stat]);

  // console.log(
  //   'Total unique hostname',
  //   batteryData ? Object.keys(batteryData).length : 0
  // );

  const hostnames = [
    { value: '44-4b-5d-01-04-19', label: '44-4b-5d-01-04-19' },
    { value: '44-4b-5d-01-04-41', label: '44-4b-5d-01-04-41' },
    { value: '44-4b-5d-01-04-29', label: '44-4b-5d-01-04-29' },
    { value: '44-4b-5d-01-04-79', label: '44-4b-5d-01-04-79' },
    { value: '44-4b-5d-01-04-a1', label: '44-4b-5d-01-04-a1' },
    { value: '44-4b-5d-01-04-91', label: '44-4b-5d-01-04-91' },
    { value: '44-4b-5d-01-04-09', label: '44-4b-5d-01-04-09' },
    { value: '44-4b-5d-01-04-51', label: '44-4b-5d-01-04-51' },
    { value: '44-4b-5d-01-04-89', label: '44-4b-5d-01-04-89' },
    { value: '44-4b-5d-01-04-21', label: '44-4b-5d-01-04-21' },
    { value: '44-4b-5d-01-04-11', label: '44-4b-5d-01-04-11' },
    { value: '44-4b-5d-01-04-81', label: '44-4b-5d-01-04-81' },
    { value: '44-4b-5d-01-04-31', label: '44-4b-5d-01-04-31' },
    { value: '44-4b-5d-01-04-b1', label: '44-4b-5d-01-04-b1' },
    { value: '44-4b-5d-01-04-01', label: '44-4b-5d-01-04-01' },
    { value: '44-4b-5d-01-04-39', label: '44-4b-5d-01-04-39' },
  ];
  const devices = [
    { value: 'SPO2', label: 'SPO2 Sensor' },
    { value: 'RESP', label: 'RESP Sensor' },
    { value: 'HUB', label: 'Hub' },
  ];
  const stats = [
    { value: 'Temperature', label: 'Temperature' },
    { value: 'Capacity', label: 'Capacity' },
    { value: 'Voltage', label: 'Voltage' },
    { value: 'Current', label: 'Current' },
  ];

  // eslint-disable-next-line react/prop-types, no-unused-vars
  const CustomTooltip = ({ active, payload, label }) => {
    // eslint-disable-next-line react/prop-types
    if (active && payload && payload.length) {
      // eslint-disable-next-line react/prop-types
      const date = new Date(payload[0].value);
      const dayOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ][date.getDay()];
      return (
        <div className='custom-tooltip'>
          <p className='label'>{`Date: ${date.toLocaleDateString()}`}</p>
          <p className='label'>{`${yLabel}: ${payload[1].value}`}</p>
          <p className='label'>{`Day of the Week: ${dayOfWeek}`}</p>
        </div>
      );
    }

    return null;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const LineGraphToolTip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(payload[0].payload.timestamp);
      const dayOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ][date.getDay()];

      const dataKey = capitalizeFirstLetter(payload[0].dataKey);
      console.log(payload[0].payload);
      const keys = Object.keys(payload[0].payload);
      return (
        <div className='custom-tooltip'>
          <p className='label'>{`Date: ${date.toLocaleDateString()}`}</p>
          <p className='label'>{`${dataKey}: ${
            payload[0].payload[keys[1]]
          }`}</p>
          <p className='label'>{`Day of the Week: ${dayOfWeek}`}</p>
        </div>
      );
    }

    return null;
  };

  const dummyData = [
    { x: '1', y: '1' },
    { x: '2', y: '2' },
    { x: '3', y: '3' },
  ];

  return (
    <>
      <link
        href='https://fonts.googleapis.com/css?family=Source+Sans+Pro'
        rel='stylesheet'
        type='text/css'
      ></link>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div className='color' style={{ margin: 0 }}>
          <h1
            style={{
              fontFamily: 'Source Sans Pro',
              fontSize: 48,
              fontWeight: '700',
              color: '#650acd',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            Wireless Battery Analytics
          </h1>
        </div>
        <div
          style={{
            borderRadius: 10,
            backgroundColor: 'white',
            height: 800,
            width: 1200,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div>
            <div style={{ padding: 20, alignContent: 'center', width: 300 }}>
              {' '}
              <h3 style={{ color: 'black', fontSize: 24 }}>Hostname</h3>{' '}
              <Select
                onChange={(x) => setHostname(x['value'])}
                options={hostnames}
                defaultValue={hostnames[0]}
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    width: 'auto',
                    maxWidth: '100%',
                  }),
                  option: (provided) => ({
                    ...provided,
                    color: 'black',
                    padding: '12px',
                    fontSize: '16px',
                  }),
                }}
                menuPlacement='auto'
              />
            </div>
            <div style={{ padding: 20, alignContent: 'center', width: 200 }}>
              <h3 style={{ color: 'black', fontSize: 24 }}>Device</h3>{' '}
              <Select
                onChange={(x) => setDevice(x['value'])}
                options={devices}
                defaultValue={devices[0]}
                styles={{
                  option: (provided) => ({
                    ...provided,
                    color: 'black',
                  }),
                }}
              ></Select>
            </div>
            <div style={{ padding: 20, alignContent: 'center', width: 200 }}>
              <h3 style={{ color: 'black', fontSize: 24 }}>Statistic</h3>{' '}
              <Select
                onChange={(x) => setStat(x['value'])}
                options={stats}
                defaultValue={stats[0]}
                styles={{
                  option: (provided) => ({
                    ...provided,
                    color: 'black',
                  }),
                }}
              ></Select>
            </div>

            <div
              style={{
                width: 400,
              }}
            ></div>
            <div style={{ padding: 20, alignContent: 'center', width: 400 }}>
              <Form>
                <Form.Check
                  onChange={() => setPlot('plot')}
                  type='radio'
                  label='Line Plot'
                  name='1'
                  checked={plot === 'plot'}
                />
                <Form.Check
                  onChange={() => setPlot('scatter')}
                  type='radio'
                  label='Scatter Plot'
                  name='1'
                  checked={plot === 'scatter'}
                />
              </Form>
            </div>
            <div style={{ padding: 20, alignContent: 'center', width: 400 }}>
              <Form>
                <Form.Check
                  onChange={() =>
                    setDischargeCycleToggle(!dischargeCycleToggle)
                  }
                  type='switch'
                  label='Show Discharge Cycles'
                />
              </Form>
            </div>

            {dischargeCycleToggle ? (
              <div style={{ padding: 20, alignContent: 'center', width: 175 }}>
                <Form>
                  <Form.Group>
                    <Form.Label>Discharge Cycle</Form.Label>
                    <Form.Control
                      defaultValue={1}
                      onChange={(e) => setDischargeCycle(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <div style={{ marginTop: 10 }}>
                    <Button onClick={() => getData()}>Submit</Button>
                  </div>
                </Form>
              </div>
            ) : (
              <></>
            )}
          </div>
          {plot === 'scatter' ? (
            batteryData && batteryData.length > 0 ? (
              <ResponsiveContainer
                width='100%'
                height='100%'
                style={{ marginTop: '20px' }}
              >
                <ScatterChart style={{ overflow: 'visible' }}>
                  <CartesianGrid stroke='grey' strokeDasharray='5 5' />
                  <XAxis
                    dataKey='timestamp'
                    angle={-15}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString()
                    }
                    tickSize={20}
                    height={130}
                    minTickGap={40}
                    allowDuplicateCategory={false}
                    label={{
                      value: 'Timestamp',
                    }}
                  />
                  <YAxis
                    dataKey={stat.toLowerCase()}
                    name={stat}
                    domain={[minStat - 2, maxStat + 2]}
                    label={{
                      value: yLabel,
                      angle: -90,
                      position: 'insideLeft',
                    }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={<CustomTooltip />}
                  />
                  <Scatter
                    data={batteryData}
                    fill='#8884d8'
                    isAnimationActive={false}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer
                width='100%'
                height='90%'
                style={{ marginTop: '20px' }}
              >
                <ScatterChart>
                  <CartesianGrid stroke='grey' strokeDasharray='5 5' />
                  <Scatter data={dummyData} fill='#8884d8' shape={() => null} />
                  <XAxis dataKey='x' />
                  <YAxis dataKey='y' />
                </ScatterChart>
              </ResponsiveContainer>
            )
          ) : batteryData && batteryData.length > 0 ? (
            <LineChart
              data={batteryData}
              width={1000}
              height={600}
              margin={{ top: 5, right: 40, bottom: 20, left: 20 }}
            >
              <XAxis
                dataKey='timestamp'
                angle={-25}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                tickSize={20}
              >
                {' '}
                <Label
                  value='Timestamp'
                  position='bottom'
                  offset={45}
                  allowDuplicateCategory={false}
                />
              </XAxis>
              <YAxis
                dataKey={stat.toLowerCase()}
                type='number'
                domain={[minStat - 2, maxStat + 2]}
                label={{ value: yLabel, angle: -90, position: 'insideLeft' }}
              />
              <CartesianGrid stroke='grey' strokeDasharray='5 5' />
              <Line dataKey={stat.toLowerCase()} stroke='black' dot={false} />

              <Tooltip content={<LineGraphToolTip />} />
            </LineChart>
          ) : (
            <LineChart
              data={dummyData}
              width={1000}
              height={600}
              margin={{ top: 5, right: 40, bottom: 20, left: 20 }}
            >
              <XAxis dataKey='x' />
              <YAxis dataKey='y' />
              <CartesianGrid stroke='grey' strokeDasharray='5 5' />
              <Line stroke='black' dot={false} />
            </LineChart>
          )}

          {/* {plotImage && <img src={plotImage} alt='Plot' />} */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
