import React from "react";
import GoToTop from "../../GoToTop";
import { MdDoubleArrow } from "react-icons/md";
import PolicySidebar from "./PolicySidebar";

function Privacy() {
  return (
    <>
      <GoToTop />
      <section>
        <div className="container-fluid my-4">
          <div className="row">
            <div className="col-lg-3">
              <PolicySidebar />
            </div>
            <div className="col-lg-9 mt-2">
              <h5>
                <MdDoubleArrow className="icon" /> Privacy Policy
              </h5>
              <p>
                This Website does not automatically capture any specific
                personal information from you, (like name, phone number, or
                e-mail address), that allows us to identify you individually.
                <br />
                <br />
                If the Website requests you to provide personal information, you
                will be informed of the particular purposes for which the
                information is gathered and adequate security measures will be
                taken to protect your personal information.
                <br />
                <br />
                We do not sell or share any personally identifiable information
                volunteered on the Website to any third party (public/private).
                Any information provided to this Website will be protected from
                loss, misuse, unauthorized access or disclosure, alteration, or
                destruction.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Privacy;
