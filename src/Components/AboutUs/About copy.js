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
                The Directorate has designated specific work to various wings to
                facilitate smooth functioning of the department.
              </p>
              <h6 className="aboutus-points">PRESS LIAISON SECTION</h6>
              <p>
                This section prepares, handles and disseminates official news
                backed by photographs (where necessary) to the print and
                electronic media. Clarification against faulty news and views
                published in the media are issued by this section. Another major
                responsibility of the SL section is to prepare speeches and
                messages etc. for VIPs on all the important occasions. Moreover,
                coverage of Government functions and VIP programmes are also
                done by this Section.
              </p>
              <h6 className="aboutus-points">PRESS RESEARCH SECTION</h6>
              <p>
                This section constantly monitors what is reported in the print
                media concerning the State and the functioning of the
                Government. Clippings of news and views are regularly made and
                sent to concerned Ministries and officials with entry into a
                live Register.
              </p>
              <h6 className="aboutus-points">ARCHIVE</h6>
              <p>
                This section has to photograph and preserve almost all important
                official functions. These are distributed for publication in
                mass media. Moreover, Daily newspapers are also preserved in the
                Section.
              </p>
              <h6 className="aboutus-points">ADVERTISEMENT SECTION</h6>
              <p>
                The Government has always laid adequate stress on this powerful
                medium. DIPR is the sole agency to release all government
                advertisements to the media. State Government releases and pays
                for the advertisements released through DIPR.
              </p>
              <h6 className="aboutus-points">CULTURAL WING</h6>
              <p>
                Songs, street plays, dances etc. are profusely used to propagate
                messages of community involvement in the administration and
                development of society. DIPR has a full fledged troupe of
                artists to this effect, based at Srimanta Sankardeva
                Kalakshetra, Guwahati
              </p>
              <h6 className="aboutus-points">EXHIBITION WING</h6>
              <p>
                Display of important photo, artifacts etc. done in an artistic
                way always attract people’s interest. DIPR has a wing
                exclusively meant for preparation and shaping of field level
                exhibition.
              </p>
              <h6 className="aboutus-points">TECHNICAL SECTION</h6>
              <p>
                DIPR covers important official functions through Public Address
                System also. They have a team of trained staff and officers in
                this section. Moreover, this section handles a huge network of
                Fixed Loudspeaker System (FLS) in almost all important towns of
                the state which acts as a local broadcasters.
              </p>
              <h6 className="aboutus-points">INFORMATION CENTRE</h6>
              <p>
                DIPR has a modest Information Center with sufficient books and
                reference materials at Sremanta Sankardeva Kakalshetra, Guwahati
                under supervision of a Senior Departmental Officer. The Centre
                is meant for anyone interested to know various facts of the
                state.
              </p>
              <h6 className="aboutus-points">PUBLICATION SECTION</h6>
              <p>
                Important Government policy matters, views, proceedings,
                interpretation etc. along with topical matters concerning public
                welfare and important speeches of dignitaries on various
                occasion are compiled and published by the DIPR through this
                section. Beside publishing periodicals, pamphlets, booklets etc.
                this section brings out a regular weekly newspaper titled
                “RAIJOR BATORI” (News of the People) with a circulation of
                30,000 copies. The modern weekly newspaper carries the official
                news and views of the masses.
              </p>
              <h6 className="aboutus-points">REGIONAL OFFICE</h6>
              <p>
                DIPR has set-up five Regional Offices with Senior Officer at the
                helm in various part of the State and outside State, so as to
                streamline Departmental functioning. Inside the state DIPR has
                Regional offices at Diphu, Jorhat and Kokrajhar. And outside the
                state at Kolkata and New Delhi. These offices incorporate all
                the functioning of the directorate and also coordinates
                activities of the DIPR field offices in their respective
                jurisdiction.
              </p>
              <h6 className="aboutus-points">
                DISTRICT AND SUB-DIVISIONAL OFFICES
              </h6>
              <p>
                DIPR has a well monitored network of departmental officers and
                staff spread across the State. These District and Sub-divisional
                Information and Public Relations Officers are entrusted to
                function as ear and voice of the Government in the field level.
                These officers frequently organize various exercises to generate
                and mould public opinion in support of the policies of the
                Government through means of audio, visual media etc. These field
                offices also run a Fixed Loudspeaker System (FLS) at important
                places for broadcasting of official announcement needing
                immediate public attention. Prior to the advent of easy
                satellite broadcast, these DIPR field officers were very popular
                with their mobile news and cinema shows, cultural programmes
                etc. These offices also function as a good library for the
                public with its stock of valuable books, periodicals etc.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
