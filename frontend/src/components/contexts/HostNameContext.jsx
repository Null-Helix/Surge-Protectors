import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const HostNameContext = createContext();

export const HostNameProvider = ({ children }) => {
  const [hostName, setHostName] = useState(null);
  return (
    <HostNameContext.Provider value={[hostName, setHostName]}>
      {children}
    </HostNameContext.Provider>
  );
};

HostNameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HostNameContext;
