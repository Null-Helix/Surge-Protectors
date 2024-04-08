/* eslint-disable react/prop-types */
import {
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  Tooltip,
} from 'recharts';

const ScatterPlot = ({ batteryData, minStat, stat, maxStat, yLabel }) => {
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

      const time = `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

      return (
        <div className='custom-tooltip'>
          <p className='label'>{`Date: ${date.toLocaleDateString()}`}</p>
          <p className='label'>{`Time: ${time}`}</p>
          <p className='label'>{`Discharge Cycle: ${payload[0].payload.cycle}`}</p>
          <p className='label'>{`${yLabel}: ${payload[1].value}`}</p>
          <p className='label'>{`Day of the Week: ${dayOfWeek}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer
      width='100%'
      height='100%'
      style={{ marginTop: '20px' }}
    >
      <ScatterChart style={{ overflow: 'visible' }}>
        <CartesianGrid stroke='grey' strokeDasharray='5 5' />
        <XAxis
          dataKey='timestamp'
          angle={-18}
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
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
        <Scatter data={batteryData} fill='#8884d8' isAnimationActive={false} />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlot;
