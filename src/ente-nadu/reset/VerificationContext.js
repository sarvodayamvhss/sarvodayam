import { createContext, useContext, useState } from "react";

const VerificationContext = createContext();

export const useVerificationContext = () => useContext(VerificationContext);

export const VerificationProvider = ({ children }) => {
  const [verificationData, setVerificationData] = useState(null);

  const storeVerificationData = (data) => {
    setVerificationData((prevData) => ({ ...prevData, ...data }));
  };

  const storeConfirmationResult = (confirmationResult) => {
    setVerificationData((prevData) => ({
      ...prevData,
      confirmationResult,
    }));
  };

  return (
    <VerificationContext.Provider
      value={{ verificationData, storeVerificationData, storeConfirmationResult }}
    >
      {children}
    </VerificationContext.Provider>
  );
};
