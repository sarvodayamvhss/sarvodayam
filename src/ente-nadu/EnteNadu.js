import React, { useEffect } from "react";
import "./stylefirst.css";

function EnteNadu() {
  const handleDownload = () => {
    // Temp
    const fileUrl = 'https://github.com/Sarvodayam-VHSS/entenadu/releases/download/v1.0.0/entenadu-v1.0.0.apk';
    const link = document.createElement('a');
    link.href = fileUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    document.body.classList.add("en-page-ente-nadu");

    return () => {
      document.body.classList.remove("en-page-ente-nadu");
    };
  }, []);

  return (
    <div className="container-fluid">
      <table className="en-home-table">
        <tbody>
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
              <img src="/logo5-.png" alt="Logo 1" className="ente-nadu1" />
            </td>
          </tr>
          <tr>
            <td>
              <img src="/navlogo.png" alt="Logo 2" className="ente-nadu2" />
            </td>
            <td>
              <img src="/newlogo.png" alt="Logo 3" className="ente-nadu3" />
            </td>
            <td>
              <img src="/logo2-.png" alt="Logo 4" className="ente-nadu4" />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="en-page-action1">
        <div>
          <a href="/entenadu/login">
            <button>
            Login
              <div className="arrow-wrapper">
                <div className="arrow"></div>
              </div>
            </button>
          </a>
        </div>
          &nbsp;
        <div>
          <button onClick={handleDownload} className="download-button">
            Download App
          </button>
        </div>
      </div>
      <div className="en-page-footer">
        <span>| Powered by Sarvodayam VHSS |</span>
      </div>
    </div>
  );
}

export default EnteNadu;
