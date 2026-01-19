import React from "react";
import mainLogo from "../Assets/Logos/mainlogo.webp";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-cta pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="cta-text">
                    <h4>Find us</h4>
                    <span>Diphu, Assam, 782460</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-phone"></i>
                  <div className="cta-text">
                    {/* <h4>Call us</h4>
                    <span>9876543210 0</span> */}
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="far fa-envelope-open"></i>
                  <div className="cta-text">
                    {/* <h4>Mail us</h4>
                    <span>info@iprkaac.com</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <a href="/">
                      <img src={mainLogo} className="img-fluid" alt="logo" />
                    </a>
                  </div>
                  <div className="footer-text">
                    <p>
                      Deputy Director of Information & Public Relations (Hills)
                      Diphu Karbi Anglong
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-6 mb-30">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">Abouts Us</Link>
                    </li>
                    <li>
                      <Link to="/updates">Information & Services</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="#">Documents</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 mb-50">
                {/* <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Subscribe</h3>
                  </div>
                  <div className="footer-text mb-25">
                    <p>
                      Don’t miss to subscribe to our new feeds, kindly fill the
                      form below.
                    </p>
                  </div>
                  <div className="subscribe-form">
                    <form action="#">
                      <input type="text" placeholder="Email Address" />
                      <button>
                        <i className="fab fa-telegram-plane"></i>
                      </button>
                    </form>
                  </div>
                </div> */}
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Policies</h3>
                  </div>
                  <ul>
                    <li>
                      <Link to="/policy-privacy">Privacy Policy</Link>
                    </li>

                    <li>
                      <Link to="/policy-copyright">Copyright Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                <div className="copyright-text">
                  <p>
                    Copyright &copy; iprkaac.com 2024, All Right Reserved{" "}
                    {/* <a href="https://techrysen.com" target="_blank">
                      TechRysen
                    </a> */}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 text-right">
                <div className="copyright-text text-center">
                  <p>
                    Website Last Updated on:{" "}
                    <b style={{ color: "#2a75bb" }}>2-Jan-2026</b>
                  </p>
                </div>
                {/* <div className="footer-menu">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/">Terms</Link>
                    </li>
                    <li>
                      <Link to="/">Privacy</Link>
                    </li>
                    <li>
                      <Link to="/">Policy</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
