import React from "react";
import mainLogo from "../../Assets/Logos/mainlogo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "./Auth/UserAuthContext";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";

function Sidebar() {
  const { logOut, user } = useUserAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
      return false;
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <section className="sidebar">
        <div className="header">
          <a>
            <img src={mainLogo} alt="" className="img-fluid" />
          </a>
        </div>

        <div className="navigation">
          <div className="section main-section">
            <div className="title-wrapper">
              <span className="title">Main</span>
            </div>
            <ul className="items">
              <li className="item">
                <Link to="/user-dashboard">
                  <LuLayoutDashboard />
                  <span className="item-text">Dashboard</span>
                </Link>
              </li>
              <li className="item">
                <Link to="/admin-all-news">
                  <IoNewspaperOutline />
                  <span className="item-text">News</span>
                </Link>
              </li>
              <li className="item">
                <Link to="/admin-updates">
                  <IoNotificationsOutline />
                  <span className="item-text">Notifications</span>
                </Link>
              </li>

              <li className="item">
                <Link to="/admin-deputy-directors">
                  <FaUserFriends />
                  <span className="item-text">Deputy Directors</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="section settings-section">
            <div className="title-wrapper">
              <span className="title">Settings</span>
            </div>
            <ul className="items">
              <li className="item">
                <a>
                  <IoSettingsOutline />
                  <span className="item-text">Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={handleLogout}
            className="btn btn-danger"
            style={{ width: "13.5vw" }}
          >
            <FaSignOutAlt style={{ marginTop: "-3px" }} /> <span>Logout</span>
          </button>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
