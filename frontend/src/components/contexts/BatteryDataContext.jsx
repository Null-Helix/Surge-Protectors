import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const BatteryDataContext = createContext();

export const BatteryDataProvider = ({ children }) => {
  const [batteryData, setBatteryData] = useState(null);
  return (
    <BatteryDataContext.Provider value={[batteryData, setBatteryData]}>
      {children}
    </BatteryDataContext.Provider>
  );
};

BatteryDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BatteryDataContext;
