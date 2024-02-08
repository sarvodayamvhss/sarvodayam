import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navibar from './components/Navibar';
import EnteNadu from './ente-nadu/EnteNadu';
import EnteNaduReg from './ente-nadu/EnteNaduReg';
import Resetpass from './ente-nadu/Resetpass';
import Verify from './ente-nadu/Verify';
import Reset from './ente-nadu/Reset';

const App = () => {
  return (
    <Router>
      <div>
        <Navibar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entenadu" element={<EnteNadu />} />
          <Route path="/Resetpass" element={<Resetpass />} />
          <Route path="/Verify" element={<Verify />} />
          <Route path="/Reset" element={<Reset />} />
          <Route path="/entenadu/registration" element={<EnteNaduReg />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
