import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../Styles/Navibar.css';

const Navibar = () => {
  return (
    <div>
      <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark" expand="md">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/nav.svg"
              width="150"
              height="auto"
              className="d-inline-block align-top"
              alt="Sarvodayam VHSS"
            />
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#home">
              <img
                src="/entelogo.svg" // Replace with the path to your small logo SVG
                width="120"
                height="auto"
                className="d-inline-block align-middle mr-1" // Adjust margins as needed
                alt="Small Logo"
              />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navibar;
