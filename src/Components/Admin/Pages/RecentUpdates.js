import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../Supabase";
import { FaPencilAlt } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { GrWaypoint } from "react-icons/gr";

function RecentUpdates() {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Date formatter
  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";

    const createdDate = new Date(dateValue);
    const now = new Date();

    const diffMs = now - createdDate;
    const mins = Math.floor(diffMs / (1000 * 60));
    const hrs = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

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

    // 👉 More than 2 days → full date
    if (days > 2) {
      const day = createdDate.getDate();
      const month = createdDate.toLocaleString("en-GB", { month: "short" });
      const year = createdDate.getFullYear();
      return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
    }

    // 👉 Within 2 days → relative time
    if (days > 0) return `${days} days ago`;
    if (hrs > 0) return `${hrs} hours ago`;
    if (mins > 0) return `${mins} minutes ago`;

    return "Just now";
  };

  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("all_updates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching updates:", error);
      } else {
        setUpdates(data || []);
      }

      setLoading(false);
    };

    fetchUpdates();
  }, []);

  return (
    <>
      <div id="main-wrapper">
        <div className="d-flex justify-content-between">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <GrWaypoint style={{ marginTop: "-3px" }} /> Home
              </li>
              <li className="breadcrumb-item">Notifications</li>
            </ol>
          </nav>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/admin-add-update")}
          >
            <FaPlus style={{ marginTop: "-3px" }} /> Add Notification
          </button>
        </div>
        <Table className="table table-striped table-bordered mt-2">
          <thead className="table_header">
            <tr>
              <th className="text-center">#</th>
              <th>Notification</th>
              <th>Type</th>
              <th>Category</th>
              <th>Year</th>
              <th>Department</th>
              <th>Created On</th>
              <th className="text-center">PDF</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {updates.length > 0 ? (
              updates.map((update, index) => (
                <tr key={update.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{update.title}</td>
                  <td>{update.type}</td>
                  <td>{update.category}</td>
                  <td>{update.year}</td>
                  <td>{update.department}</td>
                  <td>{formatDate(update.created_at)}</td>
                  <td className="text-center">
                    <a href={update.pdf_url} target="_blank">
                      {update.pdf_url ? (
                        <FaFilePdf style={{ color: "red", fontSize: "15px" }} />
                      ) : null}
                    </a>
                  </td>
                  <td className="text-center">
                    <FaPencilAlt
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/update-admin-update/${update.id}`)
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center">
                  {loading ? "Loading..." : "No updates available"}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default RecentUpdates;
