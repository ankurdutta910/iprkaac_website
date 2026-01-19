import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function InfoSidebar() {
  const location = useLocation();

  return (
    <>
      <section>
        <div className="container-fluid">
          <ul className="nav flex-column infosidebar">
            <li className="nav-itemm">
              <span>
                <MdKeyboardDoubleArrowRight /> Information & Services
              </span>
            </li>

            <li
              className={`nav-item ${
                location.pathname === "/updates" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/updates">
                <MdKeyboardDoubleArrowRight /> All Updates
              </Link>
            </li>

            <li
              className={`nav-item ${
                location.pathname === "/advertisements" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/advertisements">
                <MdKeyboardDoubleArrowRight /> Advertisements
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/updates">
                <MdKeyboardDoubleArrowRight /> Publications
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/updates">
                <MdKeyboardDoubleArrowRight /> Press Tour
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/updates">
                <MdKeyboardDoubleArrowRight /> LED BillBoard
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default InfoSidebar;
