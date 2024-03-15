import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState('');

  SearchBar.propTypes = {
    setResults: PropTypes.func.isRequired,
  };

  const fetchData = (value) => {
    fetch('http://127.0.0.1:5001/hostnames')
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((hostName) => {
          return value && hostName && hostName.includes(value);
        });
        console.log(results);
        setResults(results);
      });
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
