import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { db } from "../../Firebase"; // Firestore reference
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import InfoSidebar from "./InfoSidebar";
import { MdDoubleArrow } from "react-icons/md";
import GoToTop from "../../GoToTop";
function Home() {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch updates from Firestore
    const fetchUpdates = async () => {
      setLoading(true);
      try {
        // Create a query with a limit of 3 and order by the 'postedOn' field
        const updatesQuery = query(
          collection(db, "all_updates"),
          orderBy("priority", "asc")
        );

        const querySnapshot = await getDocs(updatesQuery);
        const fetchedUpdates = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUpdates(fetchedUpdates);
      } catch (error) {
        console.error("Error fetching updates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <>
      <GoToTop />
      <section>
        <div className="container-fluid my-2">
          <div className="row">
            <div className="col-lg-3">
              <InfoSidebar />
            </div>
            <div className="col-lg-9 my-4">
              <h5>
                <MdDoubleArrow className="icon" /> Advertisements
              </h5>
              <p>
                Department of Information & Public Relations Karbi Anglong is
                the Nodal Department that issues advertisements on behalf of the
                State Government.
              </p>
              <table className="table table-striped table-bordered table-md">
                <thead className="header-primary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Department</th>
                    <th scope="col">Type</th>
                    <th scope="col" className="text-center">
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {updates && updates.length > 0 ? (
                    updates.map((update, index) => (
                      <tr key={update.id}>
                        <td style={{ width: "15px" }} className="text-center">
                          {index + 1}
                        </td>
                        <td className="text-left">{update.title}</td>

                        <td className="text-left">{update.department}</td>
                        <td className="text-left">{update.type}</td>

                        <td className="text-center">
                          <FaFilePdf
                            style={{ fontSize: "15px", color: "red" }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center" }}>
                        {loading ? "Loading..." : "No updates available"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
