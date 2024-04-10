import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import HostNameContext from '../../contexts/HostNameContext';
// eslint-disable-next-line react/prop-types
export const SearchResultsList = ({
  results,
  clearResult,
  setClearResult,
  clearSearchResults,
}) => {
  const [hostName, setHostName] = useContext(HostNameContext);

  const handleLinkClick = (result) => {
    clearSearchResults();
    setHostName(result);
    setClearResult(!clearResult);
  };

  return (
    <div className='results-list'>
      {results.map((result, id) => {
        return (
          <li key={id}>
            <Link
              to={`/battery-stat?hubName=${result}`}
              onClick={() => handleLinkClick(result)}
            >
              {result}
            </Link>
          </li>
        );
      })}
    </div>
  );
};
