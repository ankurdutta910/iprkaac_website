import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function PolicySidebar() {
  const location = useLocation();

  return (
    <>
      <section>
        <div className="container">
          <ul className="nav flex-column infosidebar">
            {/* <li className="nav-itemm">
              <span>
                <MdKeyboardDoubleArrowRight /> Information & Services
              </span>
            </li> */}

            <li
              className={`nav-item ${
                location.pathname === "/policy-privacy" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/policy-privacy">
                <MdKeyboardDoubleArrowRight /> Privacy Policy
              </Link>
            </li>

            <li
              className={`nav-item ${
                location.pathname === "/policy-copyright" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/policy-copyright">
                <MdKeyboardDoubleArrowRight /> Copyright Policy
              </Link>
            </li>

           
          </ul>
        </div>
      </section>
    </>
  );
}

export default PolicySidebar;
