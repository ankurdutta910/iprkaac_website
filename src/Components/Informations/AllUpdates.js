import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { supabase } from "../../Supabase"; // ✅ Supabase client
import { useNavigate } from "react-router-dom";
import InfoSidebar from "./InfoSidebar";
import { MdDoubleArrow } from "react-icons/md";
import GoToTop from "../../GoToTop";

function Home() {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("all_updates")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching updates:", error);
        } else {
          setUpdates(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  const formatDate = (created_at) => {
    const postedDate = new Date(created_at);
    const now = new Date();

    const diffInMs = now - postedDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    if (diffInDays > 2) {
      const day = postedDate.getDate();
      const month = postedDate.toLocaleString("en-GB", {
        month: "short",
      });
      const year = postedDate.getFullYear();
      return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
    } else if (diffInDays > 0) {
      return `${diffInDays} days ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hours ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minutes ago`;
    } else {
      let hours = postedDate.getHours();
      const minutes = postedDate.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      return `Today at ${hours}:${
        minutes < 10 ? "0" + minutes : minutes
      } ${ampm}`;
    }
  };

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
                <MdDoubleArrow className="icon" /> All Updates
              </h5>
              <p>
                Department of Information & Public Relations Karbi Anglong is
                the Nodal Department that issues all types of updates on behalf
                of the State Government.
              </p>

              <table className="table table-striped table-bordered table-md">
                <thead className="header-primary">
                  <tr>
                    <th>#</th>
                    <th>Notification Date</th>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Type</th>
                    <th className="text-center">PDF</th>
                  </tr>
                </thead>

                <tbody>
                  {updates.length > 0 ? (
                    updates.map((update, index) => (
                      <tr key={update.id}>
                        <td className="text-center" style={{ width: "15px" }}>
                          {index + 1}
                        </td>

                        <td>{formatDate(update.created_at)}</td>
                        <td
                          className="text-left"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/update/${update.id}`)}
                        >
                          {update.title}
                        </td>

                        <td>{update.department}</td>
                        <td>{update.type}</td>

                        <td className="text-center">
                          {update.pdf_url && (
                            <a href={update.pdf_url} target="_blank">
                              <FaFilePdf
                                style={{ fontSize: "15px", color: "red" }}
                              />
                            </a>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
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
