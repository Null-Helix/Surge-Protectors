import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BatteryLanding from './pages/BatteryLanding';
import BatteryData from '../BatteryData';
import BatteryError from './pages/BatteryError';
import BatteryInfo from './pages/BatteryInfo';
import BatteryStat from './pages/BatteryStat';
export default function BatteryRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  Have the nav bar */}
        <Route path='/' element={<BatteryData />}>
          {/* Lading page/ homepage */}
          <Route index element={<BatteryLanding />} />

          <Route path='battery-info' element={<BatteryInfo />} />
          <Route path='battery-stat/*' element={<BatteryStat />}></Route>

          {/* Error page when route doesn't match */}
          <Route path='*' element={<BatteryError />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
