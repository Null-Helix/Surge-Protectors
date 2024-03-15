import { useState, useEffect } from 'react';
import Select from 'react-select';
// import BatteryDataContext from '../../contexts/BatteryDataContext';
import {
  LineChart,
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Scatter,
  Tooltip,
  Legend,
} from 'recharts';

export default function BatteryLanding() {
  const [hostname, setHostname] = useState('44-4b-5d-01-04-29');
  const [device, setDevice] = useState('SPO2');
  const [stat, setStat] = useState('Temperature');
  const [batteryData, setBatteryData] = useState([]);

  async function getData() {
    try {
      console.log('Data', hostname, device, stat);

      const response = await fetch(
        `http://127.0.0.1:5001/hubinfo/${hostname}/${device}/${stat}`,
        {
          method: 'GET',
        }
      );

      const result = await response.json();

      // temperature, voltage, current, capacity

      setBatteryData(result);

      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getData();
  }, [hostname, device, stat]);

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
    { value: 'HUB', label: 'Hub' },
    { value: 'SPO2', label: 'SPO2 Sensor' },
    { value: 'RESP', label: 'RESP Sensor' },
  ];
  const stats = [
    { value: 'Temperature', label: 'Temperature' },
    { value: 'Capacity', label: 'Capacity' },
    { value: 'Voltage', label: 'Voltage' },
    { value: 'Current', label: 'Current' },
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
          <div style={{ padding: 20 }}>
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
          </div>
          <div style={{ padding: 30, paddingTop: 100, marginLeft: 100 }}>
            {/* {' '}
            <img
              src={
                'Hostnames\\' +
                hostname +
                '\\' +
                hostname +
                '_' +
                device +
                '_' +
                stat +
                '.png'
              }
              alt='Battery Data'
            ></img> */}

            {batteryData && batteryData.length > 0 && (
              <LineChart data={batteryData} width={1000} height={400}>
                <XAxis
                  dataKey='timestamp'
                  angle={-25}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <YAxis dataKey={stat.toLowerCase()} type='number' />
                <CartesianGrid stroke='grey' strokeDasharray='5 5' />
                <Line dataKey={stat.toLowerCase()} stroke='black' dot={false} />
                {/* <Scatter data={stat.toLowerCase()} fill="green" /> */}
                <Tooltip
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
              </LineChart>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
