import { createContext, useContext, useState } from "react";

const VerificationContext = createContext();

export const useVerificationContext = () => useContext(VerificationContext);

export const VerificationProvider = ({ children }) => {
  const [verificationData, setVerificationData] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const storeVerificationData = (data) => {
    setVerificationData((prevData) => ({ ...prevData, ...data }));
  };

  const authenticateAdmin = (status) => {
    setIsAdminAuthenticated(status);
  };

  return (
    <VerificationContext.Provider
      value={{ verificationData, isAdminAuthenticated, storeVerificationData, authenticateAdmin }}
    >
      {children}
    </VerificationContext.Provider>
  );
};
