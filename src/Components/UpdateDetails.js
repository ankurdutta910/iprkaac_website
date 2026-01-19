import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GoToTop from "../GoToTop";
import { supabase } from "../Supabase";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";

function UpdateDetails() {
  const { id } = useParams();
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpdateDetails = async () => {
      try {
        if (!id) return;

        const { data, error } = await supabase
          .from("all_updates")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error(error);
          navigate("/404");
          return;
        }

        setUpdate(data);
      } catch (err) {
        console.error("Error fetching update:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdateDetails();
  }, [id, navigate]);

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

  if (loading) return null;

  return (
    <>
      <GoToTop />
      <section>
        <div className="container-fluid my-2" style={{ padding: "0 1.5rem" }}>
          <div className="row">
            <div className="col-lg-1"></div>

            <div className="col-lg-10">
              <div className="news-item my-3">
                <h3 className="mt-2">{update?.title}</h3>

                <p className="date_news mt-2">
                  <FaCalendarAlt className="icon" />{" "}
                  {update?.created_at ? formatDate(update.created_at) : ""} |{" "}
                  {update?.department}
                </p>

                <p
                  style={{
                    whiteSpace: "pre-line",
                    textAlign: "justify",
                  }}
                >
                  {update?.description}
                </p>

                {update?.pdf_url && (
                  <div
                    className="card p-3"
                    style={{
                      maxWidth: "400px",
                      backgroundColor: "#ffcdcaff",
                      borderColor: "#eb9a94ff",
                    }}
                  >
                    <a
                      className="m-0"
                      href={update?.pdf_url}
                      target="_blank"
                      style={{ color: "red", textDecoration: "none" }}
                    >
                      <FaRegFilePdf style={{ marginTop: "-4px" }} /> Download
                      PDF
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UpdateDetails;
