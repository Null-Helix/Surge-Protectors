import { useState } from 'react'
import Select from 'react-select'
import './App.css'

function App() {
  const [hostname, setHostname] = useState('44-4b-5d-01-04-19')
  const [device, setDevice] = useState('Hub')
  const hostnames = [
    {value: '44-4b-5d-01-04-19', label: '44-4b-5d-01-04-19'},
    {value: '44-4b-5d-01-04-41', label: '44-4b-5d-01-04-41'},
    {value: '44-4b-5d-01-04-29', label: '44-4b-5d-01-04-29'},
    {value: '44-4b-5d-01-04-79', label: '44-4b-5d-01-04-79'},
    {value: '44-4b-5d-01-04-a1', label: '44-4b-5d-01-04-a1'},
    {value: '44-4b-5d-01-04-91', label: '44-4b-5d-01-04-91'},
    {value: '44-4b-5d-01-04-09', label: '44-4b-5d-01-04-09'},
    {value: '44-4b-5d-01-04-51', label: '44-4b-5d-01-04-51'},
    {value: '44-4b-5d-01-04-89', label: '44-4b-5d-01-04-89'},
    {value: '44-4b-5d-01-04-21', label: '44-4b-5d-01-04-21'},
    {value: '44-4b-5d-01-04-11', label: '44-4b-5d-01-04-11'},
    {value: '44-4b-5d-01-04-81', label: '44-4b-5d-01-04-81'},
    {value: '44-4b-5d-01-04-31', label: '44-4b-5d-01-04-31'},
    {value: '44-4b-5d-01-04-b1', label: '44-4b-5d-01-04-b1'},
    {value: '44-4b-5d-01-04-01', label: '44-4b-5d-01-04-01'},
    {value: '44-4b-5d-01-04-39', label: '44-4b-5d-01-04-39'}
  ]
  const devices = [
    {value: 'HUB', label: 'Hub'},
    {value: 'SPO2', label: 'SPO2 Sensor'},
    {value: 'RESP', label: 'RESP Sensor'}
  ]
  document.body.style.backgroundColor="#640acc"
  return (
    <>
      <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet' type='text/css'></link>
      <div className='color'>
        <img src={'GEHCLOGOPURPLE.avif'} className="logo" alt="GEHC logo" />
        <h1 style={{fontFamily: 'Source Sans Pro', fontSize: 48}}>Wireless Battery Analytics</h1>
      </div>
      <div style={{borderRadius: 10, backgroundColor: 'white', height: 800, width: 1200, display: 'flex'}}>
        <div style={{padding: 20, alignContent: 'center', width: 200}}>
          <h3 style={{color: 'black', fontSize: 20}}>Hostname</h3>
          <Select onChange={(x) => setHostname(x['value'])} options={hostnames} defaultValue={hostnames[0]} styles={{
            option: (provided) => ({
              ...provided,
              color: 'black'
            })
          }}></Select>
        </div>
        <div style={{padding: 20, alignContent: 'center', width: 150}}>
          <h3 style={{color: 'black', fontSize: 20}}>Device</h3>
          <Select onChange={(x) => setDevice(x['value'])} options={devices} defaultValue={devices[0]} styles={{
            option: (provided) => ({
              ...provided,
              color: 'black'
            })
          }}></Select>
        </div>
        <div style={{padding: 30, paddingTop: 100}}>
          <img src={'Hostnames\\' + hostname + '\\' + hostname + '_' + device + '_Temperature.png'}></img>
        </div>
      </div>
    </>
  )
}
export default App
