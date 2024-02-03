import React from 'react';
import '../Styles/Navbar.css'; 

const Header = () => {
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="d-flex justify-content-between w-100">
        <img src="/navlogo.png" alt="Logo" className="navbar-logo" style={{ width: '150px', height: 'auto' }} />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link text-white" href="#">Home</a>
            </li>
            <li className="nav-item" style={{ marginRight: '50px' }}>
              <a className="nav-link text-white" href="#">EnteNadu</a>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default Header;
