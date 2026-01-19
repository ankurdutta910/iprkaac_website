import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function Home() {
  const location = useLocation();

  return (
    <>
      <section>
        <div className="container">
          <ul className="nav flex-column infosidebar">
            <li className="nav-itemm">
              <span>
                <MdKeyboardDoubleArrowRight /> About US
              </span>
            </li>

            {/* <li
              className={`nav-item ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/about">
                <MdKeyboardDoubleArrowRight /> Who We Are
              </Link>
            </li> */}

            <li
              className={`nav-item ${
                location.pathname === "/mandate-of-the-department"
                  ? "active"
                  : ""
              }`}
            >
              <Link className="nav-link" to="/mandate-of-the-department">
                <MdKeyboardDoubleArrowRight /> Mandate of the Department
              </Link>
            </li>

            <li
              className={`nav-item ${
                location.pathname === "/list-of-deputy-directors"
                  ? "active"
                  : ""
              }`}
            >
              <Link className="nav-link" to="/list-of-deputy-directors">
                <MdKeyboardDoubleArrowRight /> List of Deputy Directors
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Home;
