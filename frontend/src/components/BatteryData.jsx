import { Outlet } from 'react-router-dom';
import BatteryNavBar from './nav/BatteryNavBar';
import { BatteryDataProvider } from './contexts/BatteryDataContext';

export default function BatteryData() {
  return (
    <div>
      <BatteryDataProvider>
        <BatteryNavBar />

        <div style={{ margin: '1rem' }}>
          <Outlet />
        </div>
      </BatteryDataProvider>
    </div>
  );
}
