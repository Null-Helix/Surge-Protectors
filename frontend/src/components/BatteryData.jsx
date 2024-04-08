import { Outlet } from 'react-router-dom';
import BatteryNavBar from './nav/BatteryNavBar';
import { BatteryDataProvider } from './contexts/BatteryDataContext';
import { HostNameProvider } from './contexts/HostNameContext';
export default function BatteryData() {
  return (
    <div>
      <BatteryDataProvider>
        <HostNameProvider>
          <BatteryNavBar />
          <div style={{ margin: '1rem' }}>
            <Outlet />
          </div>
        </HostNameProvider>
      </BatteryDataProvider>
    </div>
  );
}
