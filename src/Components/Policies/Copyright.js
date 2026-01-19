import React from "react";
import GoToTop from "../../GoToTop";
import { MdDoubleArrow } from "react-icons/md";
import PolicySidebar from "./PolicySidebar";

function Copyright() {
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
                     <MdDoubleArrow className="icon" /> Copyright Policy
                   </h5>
                   <p>
                   Reproduction of anything on this website is permitted as long as appropriate permission is obtained by emailing us.  The content must, however, be faithfully duplicated and not utilised disparagingly or in an inaccurate way.  The source must be clearly identified wherever the content is published or distributed.  The right to reproduce this content, however, does not apply to any content that is recognised as third-party copyright.  The relevant departments or copyright holders must grant permission to reproduce such content. 
                   </p>
                 </div>
               </div>
             </div>
           </section>
    </>
  );
}

export default Copyright;
