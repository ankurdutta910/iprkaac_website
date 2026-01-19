import React, { useState } from "react";
import mainLogo from "../Assets/Logos/mainlogo.webp";
import { FaHome } from "react-icons/fa";
import { FaFileCode, FaFilePdf, FaUsers } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light container=fluid">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={mainLogo}
              alt="Information and Public Relations Department Kari anglong"
              className="img-fluid"
            />
          </a>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" type="submit">
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="sticky-header">
        <div className="container-fluid">
          <button
            className="menu-toggle"
            style={{ float: "right" }}
            onClick={toggleMenu}
          >
            ☰
          </button>

          <div className="topmenu-wrapper">
            <div className={`menu-items ${isMenuOpen ? "show" : ""}`}>
              <Link to="/" className="homepc">
                <FaHome className="icon" /> Home
              </Link>

              <div className="dropdown">
                <Link>
                  <FaFileCode className="icon" /> Information & Services
                </Link>
                <div className="dropdown-content">
                  <Link to="/updates" style={{ width: "100%" }}>
                    All Updates
                  </Link>
                  <Link to="/advertisements">Advertisements</Link>
                  <Link to="/">Publications</Link>
                  <Link to="/">Press Tour</Link>
                  <Link to="/">LED BillBoard</Link>
                </div>
              </div>

              <div className="dropdown">
                <Link>
                  <FaFileCode className="icon" /> Offices
                </Link>
                <div className="dropdown-content" style={{ width: "15vw" }}>
                  <Link style={{ width: "100%" }} to="/updates">
                    DDIPR
                  </Link>
                  <Link to="/advertisements">DIPRO, Diphu </Link>
                  <Link to="/">DIPRO, Hamren</Link>
                </div>
              </div>

              <div className="dropdown">
                <Link>
                  <FaFilePdf className="icon" /> Documents
                </Link>
                <div className="dropdown-content">{/* <Link></Link> */}</div>
              </div>
              <Link to="/mandate-of-the-department">
                <FaUsers className="icon" /> About Us
              </Link>
              <Link to="/contact">
                <MdContactPhone className="icon" /> Contact Us
              </Link>
            </div>
            <a
              className="login-link"
              style={{
                borderRight: "none",
                borderLeft: "1px solid white",
              }}
              onClick={() => navigate("/user-dashboard")}
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
