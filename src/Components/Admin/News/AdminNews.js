import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../Supabase";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { GrWaypoint } from "react-icons/gr";

function AdminNews() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH NEWS ---------------- */

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setNews(data || []);
      }

      setLoading(false);
    };

    fetchNews();
  }, []);

  /* ---------------- DATE FORMATTER ---------------- */

  const formatDate = (created_at) => {
    if (!created_at) return "";

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

    if (diffInDays > 7) {
      const day = postedDate.getDate();
      const month = postedDate.toLocaleString("en-GB", { month: "short" });
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
      return `Today at ${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <div id="main-wrapper">
        <div className="d-flex justify-content-between">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><GrWaypoint style={{ marginTop: "-3px" }} /> Home</li>
              <li className="breadcrumb-item">News</li>
            </ol>
          </nav>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/admin-add-news")}
          >
            <FaPlus style={{marginTop:'-3px'}} /> Add News
          </button>
        </div>

        <div className="row mt-2">
          {news && news.length > 0 ? (
            news.map((update) => (
              <div key={update.id} className="col-lg-3">
                <div className="article__wrapper">
                  <div className="hero-background hero-example-one--bg"></div>

                  <div className="article">
                    <div className="article_media">
                      <img
                        src={update.primary_image}
                        alt="news"
                        className="news_img_admin"
                      />
                    </div>

                    <div className="article__content">
                      <h2
                        style={{ cursor: "pointer", fontSize: "0.85rem" }}
                        onClick={() =>
                          navigate(`/admin-edit-news/${update.id}`)
                        }
                      >
                        {update.headline}
                      </h2>

                      <p className="date_news">
                        <FaCalendarAlt className="icon" />{" "}
                        {formatDate(update.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h6 style={{ textAlign: "center", width: "100%" }}>
              {loading ? "Loading..." : "No recent news available"}
            </h6>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminNews;
