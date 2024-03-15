export const SearchResultsList = ({ results }) => {
  return (
    <div className='results-list'>
      {results.map((result, id) => {
        return (
          <li key={id}>
            <a>{result}</a>
          </li>
        );
      })}
    </div>
  );
};
