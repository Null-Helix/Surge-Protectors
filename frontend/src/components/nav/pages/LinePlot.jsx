/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Label,
  Tooltip,
  Legend,
} from 'recharts';

const LinePlot = ({ batteryData, minStat, stat, maxStat, yLabel }) => {
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
      const time = `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
      const keys = Object.keys(payload[0].payload);
      return (
        <div className='custom-tooltip'>
          <p className='label'>{`Date: ${date.toLocaleDateString()}`}</p>
          <p className='label'>{`Time: ${time}`}</p>
          <p className='label'>{`Discharge Cycle: ${payload[0].payload.cycle}`}</p>
          <p className='label'>{`${dataKey}: ${
            payload[0].payload[keys[2]]
          }`}</p>
          <p className='label'>{`Day of the Week: ${dayOfWeek}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
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
  );
};

export default LinePlot;
