import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const SearchResultsList = ({
  results,
  clearResult,
  setClearResult,
  clearSearchResults,
}) => {
  const handleLinkClick = () => {
    clearSearchResults();
    setClearResult(!clearResult);
  };

  return (
    <div className='results-list'>
      {results.map((result, id) => {
        return (
          <li key={id}>
            <Link to={`/battery-stat/${result}`} onClick={handleLinkClick}>
              {result}
            </Link>
          </li>
        );
      })}
    </div>
  );
};
