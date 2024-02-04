  import React from "react";
  import "./style.css";
 
  function EnteNadu() {
    return (
        <div className="container-fluid">
          <div className="container">
            <table className="en-home-table">
              <tbody>
                <tr>
                  <td>
                    <img src="/logo.png" alt="" className="" />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="en-page-action1">
            <button>
    Register
    <div class="arrow-wrapper">
        <div class="arrow"></div>

    </div>
</button>
            </div>

            <div className="en-page-footer">
              <span>
                Powered by <b>Sarvodayam VHSS</b>
              </span>
            </div>
          </div>
        </div>
    );
  }

  export default EnteNadu;
