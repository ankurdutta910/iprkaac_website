import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { MdOutlineWifiTethering } from "react-icons/md";
import { supabase } from "../Supabase";

function AllNews() {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- DATE FORMATTER ---------------- */

  const formatDate = (dateValue) => {
    if (!dateValue) return "";

    const postedDate = new Date(dateValue);
    const now = new Date();

    const diffMs = now - postedDate;
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

    // 👉 MORE THAN 2 DAYS → SHOW DATE
    if (days > 2) {
      const day = postedDate.getDate();
      const month = postedDate.toLocaleString("en-GB", { month: "short" });
      const year = postedDate.getFullYear();
      return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
    }

    // 👉 WITHIN 2 DAYS → RELATIVE TIME
    if (days > 0) return `${days} days ago`;
    if (hrs > 0) return `${hrs} hours ago`;
    if (mins > 0) return `${mins} minutes ago`;

    let h = postedDate.getHours();
    const m = postedDate.getMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;

    return `Today at ${h}:${m < 10 ? "0" + m : m} ${ampm}`;
  };

  /* ---------------- FETCH NEWS ---------------- */

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setNews(data || []);
      } else {
        console.error("Error fetching news:", error);
      }

      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <section>
      <div className="container-fluid my-2" style={{ padding: "0 1.5rem" }}>
        {/* --------- TITLE --------- */}
        <div className="recent-updates my-2">
          <div className="label2 ripple">
            <MdOutlineWifiTethering className="icon" /> Latest News
          </div>

          {/* <div className="news_title2">
            <div className="text-slider-content">
              <p>
                {news.length > 0
                  ? news
                      .map((n, i) => `${i + 1}. ${n.headline}`)
                      .join(" | ")
                  : loading
                  ? "Loading..."
                  : "No latest news available"}
              </p>
            </div>
          </div> */}
        </div>

        {/* --------- NEWS GRID --------- */}
        <div className="row">
          {news.length > 0 ? (
            news.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 mb-3">
                <div className="article__wrapper">
                  <div className="hero-background hero-example-one--bg"></div>

                  <div className="article">
                    <div className="article_media">
                      <img
                        src={item.primary_image}
                        alt={item.headline}
                        className="news_img"
                      />
                    </div>

                    <div className="article__content">
                      <h2
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/newsdetail/${item.id}`)}
                      >
                        {item.headline.length > 90
                          ? `${item.headline.slice(0, 90)}...`
                          : item.headline}
                      </h2>

                      <p className="date_news">
                        <FaCalendarAlt className="icon" />{" "}
                        {formatDate(item.created_at)}
                      </p>

                      <h3>
                        <div
                          style={{ color: "black !important" }}
                          dangerouslySetInnerHTML={{
                            __html:
                              item.description.length > 200
                                ? item.description.slice(0, 200) + "..."
                                : item.description,
                          }}
                        ></div>
                      </h3>
                    </div>

                    <div className="article__content article_footer">
                      <Link to={`/newsdetail/${item.id}`}>
                        <span style={{ cursor: "pointer" }}>Read more...</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h6 style={{ textAlign: "center" }}>
              {loading ? "Loading..." : "No recent news available"}
            </h6>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllNews;
