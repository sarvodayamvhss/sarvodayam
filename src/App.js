import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './components/Home';
import Navibar from './components/Navibar';
import EnteNadu from './ente-nadu/EnteNadu';
import EnteNaduReg from './ente-nadu/EnteNaduReg';
import EnteNaduLog from './ente-nadu/EnteNaduLog';
import AdminPage from './ente-nadu/AdminPage';
import Reminder from './ente-nadu/Reminder';
import ForgotPass from './ente-nadu/reset/ForgotPass';
import OtpVerify from './ente-nadu/reset/OtpVerify';
import ResetPass from './ente-nadu/reset/ResetPass';
import { VerificationProvider } from './ente-nadu/reset/VerificationContext'; 

const App = () => {
  return (
    <VerificationProvider>
      <Router>
        <Navibar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entenadu" element={<EnteNadu />} />
          <Route path="/entenadu/registration" element={<EnteNaduReg />} />
          <Route path="/entenadu/login" element={<EnteNaduLog />} />
          <Route path="/entenadu/admin" element={<AdminPage />} />
          <Route path="/entenadu/reminder" element={<Reminder />} />
          <Route path="/entenadu/reset-pass" element={<ForgotPass />} />
          <Route path="/entenadu/reset-pass/verify" element={<OtpVerify />} />
          <Route path="/entenadu/reset-pass/reset" element={<ResetPass />} />
        </Routes>
      </Router>
    </VerificationProvider>
  );
};

export default App;
