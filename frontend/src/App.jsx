import './App.css';
import BatteryRouter from './components/nav/BatteryRouter';
// import Papa from 'papaparse';

function App() {
  // const handleFile = (e) => {
  // let obj = {};
  // Papa.parse(e.target.files[0], {
  //   header: true,
  //   skipEmptyLines: true,
  //   dynamicTyping: true,
  //   worker: true,
  // step: function (result) {
  //   if (!obj[result.data.hostName]) {
  //     obj[result.data.hostName] = [
  //       {
  //         cycle: result.data.cycle,
  //         device: result.data.device,
  //         timestamp: result.data.timestamp,
  //         temperature: result.data.temperature,
  //         voltage: result.data.voltage,
  //         current: result.data.current,
  //         capacity: result.data.capacity,
  //       },
  //     ];
  //   } else {
  //     obj[result.data.hostName].push({
  //       cycle: result.data.cycle,
  //       device: result.data.device,
  //       timestamp: result.data.timestamp,
  //       temperature: result.data.temperature,
  //       voltage: result.data.voltage,
  //       current: result.data.current,
  //       capacity: result.data.capacity,
  //     });
  //   }
  // },
  //     complete: function (result) {
  //       console.log(result.data);
  //     },
  //   });
  // };

  // return (
  //   <div>
  //     <input
  //       type='file'
  //       name='file'
  //       accept='.csv'
  //       onChange={handleFile}
  //       style={{ display: 'block', margin: '10px auto' }}
  //     ></input>
  //   </div>
  // );
  return <BatteryRouter />;
}

export default App;
