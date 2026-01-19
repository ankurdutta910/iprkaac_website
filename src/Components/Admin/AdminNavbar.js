import React from "react";
import mainLogo from "../../Assets/Logos/mainlogo.webp";
import { FaUser } from "react-icons/fa";

function AdminNavbar() {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light adminNav d-block">
          <div className="d-flex justify-content-between ps-3 pe-3">
            <div>
              <img src={mainLogo} alt="" className="img-fluid adminLogo" />
            </div>
            <div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div className="card  p-2 mt-2">
                  <div className="d-flex gap-2">
                    <FaUser /><h6 className="mb-0" style={{marginTop:'-2px'}}>IPR</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default AdminNavbar;
