import React from "react";

import AboutSidebar from "./AboutUs/AboutSidebar";
import { MdDoubleArrow } from "react-icons/md";
import GoToTop from "../GoToTop";
function About() {
  return (
    <>
      <GoToTop />

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28728.480731854102!2d93.41339602447982!3d25.83456512426799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3745ed397a59dd2d%3A0x66f8ef27c5a24f32!2sDiphu%2C%20Assam!5e0!3m2!1sen!2sin!4v1729697448775!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: "0" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <section>
        <div className="container-fluid my-4" style={{ padding: "5px 30px" }}>
          <h5>
            <MdDoubleArrow className="icon" />
            Contact Us
          </h5>

          <p>
           Deputy Director of Information and Public Relations(Hills) 
            <br />
            Diphu, Karbi Anglong, 782460
            {/* <br />
            Contact No. 0361- 2262830
            <br />
            Email ID for General Query: dipro.karbianglong.diphu@gmail.com{" "}
            <br />
            Email ID: dyd.iprkaac@gmail.com */}
          </p>
        </div>
      </section>
    </>
  );
}

export default About;
