import React, { useEffect } from "react";
import "./stylefirst.css";

function EnteNadu() {
  const handleDownload = () => {
    // Replace 'your_google_drive_file_id' with the actual file ID from your Google Drive
    const googleDriveFileId = "your_google_drive_file_id";

    // Construct the direct download link using the file ID
    const downloadLink = `https://drive.google.com/uc?export=download&id=${googleDriveFileId}`;

    // Creating a temporary link element
    const link = document.createElement("a");

    // Setting the href attribute to the direct download link
    link.href = downloadLink;

    // Setting the download attribute to force download
    link.download = "your_app.apk";

    // Appending the link to the body and triggering the click event
    document.body.appendChild(link);
    link.click();

    // Removing the link from the body
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
              <img src="/logo.png" alt="Logo 3" className="ente-nadu3" />
            </td>
            <td>
              <img src="/logo2-.png" alt="Logo 4" className="ente-nadu4" />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="en-page-action1">
        <div>
          <a href="/entenadu/registration">
            <button>
              Register
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
