import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const SearchBar = ({ setResults, clearResult }) => {
  const [input, setInput] = useState('');
  const [hostName, setHostName] = useState([
    '44-4b-5d-01-04-19',
    '44-4b-5d-01-04-41',
    '44-4b-5d-01-04-29',
    '44-4b-5d-01-04-79',
    '44-4b-5d-01-04-a1',
    '44-4b-5d-01-04-91',
    '44-4b-5d-01-04-09',
    '44-4b-5d-01-04-51',
    '44-4b-5d-01-04-89',
    '44-4b-5d-01-04-21',
    '44-4b-5d-01-04-11',
    '44-4b-5d-01-04-81',
    '44-4b-5d-01-04-31',
    '44-4b-5d-01-04-b1',
    '44-4b-5d-01-04-01',
    '44-4b-5d-01-04-39',
  ]);

  SearchBar.propTypes = {
    setResults: PropTypes.func.isRequired,
    clearResult: PropTypes.any,
  };

  useEffect(() => {
    setInput('');
  }, [clearResult]);

  const fetchData = (value) => {
    // fetch('http://127.0.0.1:5001/hostnames')
    //   .then((response) => response.json())
    //   .then((json) => {
    //     const results = json.filter((hostName) => {
    //       return value && hostName && hostName.includes(value);
    //     });
    //     setResults(results);
    //   });

    const results = hostName.filter((host) => {
      return value && host.includes(value);
    });
    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className='input-wrapper'>
      <FaSearch id='search-icon' style={{ marginRight: '6px' }} />
      <input
        placeholder='Search Hostnames...'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
