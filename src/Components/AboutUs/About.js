import React from "react";

import AboutSidebar from "./AboutSidebar";
import { MdDoubleArrow } from "react-icons/md";
import GoToTop from "../../GoToTop";

function About() {
  return (
    <>
      <GoToTop />
      <section>
        <div className="container-fluid my-2">
          <div className="row">
            <div className="col-lg-3">
              <AboutSidebar />
            </div>
            <div className="col-lg-9 my-4">
              <h5>
                <MdDoubleArrow className="icon" /> Who We Are
              </h5>

              <p>
                The information and public relations department, karbi anglong,
                is entrusted with the job of informing and publishing the plan,
                programmes, policies, activities and achievement of the
                government, including karbi anglong autonomous council by using
                different means of active publicity media for the welfare of
                public. It delivers Services through press releases, issuing
                advertisement and photographs, organizing press conference,
                publication of booklets, led billboard display, hoardings, press
                accreditation to journalists, announcement of govt.
                <br />
                <br />
                Messages through fls. Dissemination of important information at
                grass root level through mobile miking, website/e-mail/ face
                book /bulk sms, etc. The department also fosters healthy
                government-media relationship and establishes communication
                links between government and public using different means of
                social media and it platforms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
