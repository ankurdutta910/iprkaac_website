import React from "react";

import AboutSidebar from "./AboutSidebar";
import { MdDoubleArrow } from "react-icons/md";
import GoToTop from "../../GoToTop";

function MandateOfDept() {
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
                <MdDoubleArrow className="icon" /> Mandate of the Department
              </h5>

              <p>
                Information and Publie Relations Department plays a significant
                role in disseminating information on Government policies,
                programmes and schemes to the citizens through various media,
                hence establishes smooth and uninterrupted communication between
                Government and people. The main objective of the department is
                basically two fold i.e. informing the public about the plans,
                policies and programmes of the Government on one hand and on the
                other hand, keeping the Government informed of the people's
                reaction (feedback from the public) to its policies and
                programmes. The Department is instrumental in disseminating
                smooth and uninterrupted flow of information to the citizens
                including media and to promote regular feedback mechanism for
                the Government through the Information, Education and
                Communication (IEC) technologies.
              </p>

              <h5>
                <MdDoubleArrow className="icon" /> Vision
              </h5>
              <p>
                <ul>
                  <li>
                    Ensure smooth and uninterrupted flow of information
                    regarding Government policies, programmes and schemes to the
                    citizens including media.
                  </li>
                  <li>
                    Disseminate information about the plans, policies,
                    programmes and achievements of the Government through print,
                    electronic and social media.
                  </li>
                  <li>
                    Establish communication links between Government and people
                    using all types of media.
                  </li>
                  <li>
                    Foster healthy Media- Government relationship and apprise
                    the Government of the public perception and opinion.
                  </li>
                  <li>Implementation of welfare schemes.</li>
                </ul>
              </p>
              <h5>
                <MdDoubleArrow className="icon" /> Functions
              </h5>
              <p>
                <ul>
                  <li>
                    Acts as Nodal Agency for disseminating Government policies
                    and programmes and receives feedback from the public.
                  </li>
                  <li>
                    Generates awareness about Government welfare schemes by
                    using all kinds of IEC means.
                  </li>
                  <li>
                    Communicates with Media and Public on behalf of the
                    Government.
                  </li>
                  <li>
                    Issues Government advertisements to Print and
                    Electronie Media.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MandateOfDept;
