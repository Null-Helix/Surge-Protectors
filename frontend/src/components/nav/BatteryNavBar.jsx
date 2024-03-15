import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GELogo from '../../assets/GELogo.png';
import { SearchBar } from './pages/SearchBar';
import { SearchResultsList } from './pages/SearchResultsList';

export default function BatteryNavBar() {
  const [results, setResults] = useState([]);

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
              <Nav.Link as={Link} to='/battery-info' className='text-black'>
                Battery Info
              </Nav.Link>
            </Nav>
            <div className='mr-auto'>
              <div className='search-bar-container'>
                <SearchBar setResults={setResults} />
                <ul className='sub-menu'>
                  {results && results.length > 0 && (
                    <SearchResultsList results={results} />
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
