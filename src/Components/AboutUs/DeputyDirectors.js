import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Supabase";
import AboutSidebar from "./AboutSidebar";
import { MdDoubleArrow } from "react-icons/md";
import GoToTop from "../../GoToTop";

function DeputyDirectors() {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Date formatter for Supabase (DATE / TIMESTAMP)
const formatDate = (dateValue) => {
  if (!dateValue) return "N/A";

  // Supabase DATE format: YYYY-MM-DD
  const parts = dateValue.split("-");
  if (parts.length !== 3) return "N/A";

  const [year, month, day] = parts;
  return `${day}-${month}-${year}`;
};


  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("deputy_directors")
          .select("*")
          .order("from_date", { ascending: true });

        if (error) {
          console.error("Error fetching deputy directors:", error);
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
                <MdDoubleArrow className="icon" /> List of Deputy Directors
              </h5>

              <table className="table table-striped table-bordered table-md">
                <thead className="header-primary">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>From Date</th>
                    <th>To Date</th>
                  </tr>
                </thead>

                <tbody>
                  {updates.length > 0 ? (
                    updates.map((update, index) => (
                      <tr key={update.id}>
                        <td className="text-center" style={{ width: "15px" }}>
                          {index + 1}
                        </td>

                        <td>{update.name}</td>

                        <td>{formatDate(update.from_date)}</td>

                        <td>{formatDate(update.to_date)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        {loading ? "Loading..." : "No data available"}
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

export default DeputyDirectors;
