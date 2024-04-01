import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

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
    <div>
      <h1>Battery Stat</h1>
      {renderBoxPlots()}
    </div>
  );
}
