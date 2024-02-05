import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../Styles/navibar.css"; // Import the CSS file for styling

const Navibar = () => {
  return (
    <div>
      <Navbar
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
        expand="md"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src="/nav.svg"
              width="150"
              height="auto"
              className="d-inline-block align-top"
              alt="Sarvodayam VHSS"
            />
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/entenadu">
              <img
                src="/entelogo.svg"
                width="120"
                height="auto"
                className="d-inline-block align-middle mr-1 breathing-icon"
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

