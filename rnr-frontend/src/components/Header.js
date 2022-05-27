import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            Hansol
          </Link>
          <Nav className="me-auto">
            <Link to="/employee" className="nav-link">
              담당자
            </Link>
            <Link to="/project" className="nav-link">
              업무
            </Link>
            <Link to="/task" className="nav-link">
              R&R
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
