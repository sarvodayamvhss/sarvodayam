import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navibar from './components/Navibar';
import EnteNadu from './ente-nadu/EnteNadu';
import EnteNaduReg from './ente-nadu/EnteNaduReg';

const App = () => {
  return (
    <Router>
      <div>
        <Navibar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entenadu" element={<EnteNadu />} />
          <Route path="/entenadu/registration" element={<EnteNaduReg />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
