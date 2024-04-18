import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GELogo from '../../assets/GELogo.png';
import { SearchBar } from './pages/SearchBar';
import { SearchResultsList } from './pages/SearchResultsList';
import Button from 'react-bootstrap/Button';

export default function BatteryNavBar() {
  const [results, setResults] = useState([]);
  const [clearResult, setClearResult] = useState(false);

  const clearSearchResults = () => {
    setResults([]);
  };

  useEffect(() => {
    clearSearchResults();
  }, [setClearResult]);

  return (
    <>
      <Navbar sticky='top' expand='sm' collapseOnSelect>
        <Container>
          <Navbar.Toggle
            aria-controls='responsive-navbar-nav'
            className='navbar'
          />
          <Navbar.Brand as={Link} to='/'>
            <img
              alt='GE Health Care Logo'
              width='200rem'
              height='45rem'
              src={GELogo}
              className='d-inline-block align-top'
            />
          </Navbar.Brand>
          <Navbar.Collapse
            id='responsive-navbar-nav'
            className='justify-content-between'
          >
            <Nav variant='underline'>
              <Nav.Link as={Link} to='/' className='text-black'>
                Home
              </Nav.Link>

              <Link to={'https://www.google.com/'} className='purple-button'>
                Log Analysis
              </Link>
            </Nav>
            <div className='mr-auto'>
              <div className='search-bar-container'>
                <SearchBar setResults={setResults} clearResult={clearResult} />
                <ul className='sub-menu'>
                  {results && results.length > 0 && (
                    <SearchResultsList
                      results={results}
                      clearResult={clearResult}
                      setClearResult={setClearResult}
                      clearSearchResults={clearSearchResults}
                    />
                  )}
                </ul>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
