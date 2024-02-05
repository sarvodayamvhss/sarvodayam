import React,{ useEffect }from "react";
import "./stylefirst.css";

function EnteNadu() {
  useEffect(() => {
 
    document.body.classList.add('en-page-ente-nadu');

 
    return () => {
      document.body.classList.remove('en-page-ente-nadu');
    };
  }, []);
  return (
      <div className="container-fluid">
       
       <table className="en-home-table">
<tbody>
  <tr>
    <td colSpan="4" style={{ textAlign: 'center' }}>
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
            <a href="/entenadu/registration">
          <button>
  Register
  <div className="arrow-wrapper">
      <div className="arrow"></div>

  </div>
</button></a>
</div>
          <div className="en-page-footer">
            <span>
             | Powered by Sarvodayam VHSS |
            </span>
          </div>
      
      </div>
  );
}

export default EnteNadu;