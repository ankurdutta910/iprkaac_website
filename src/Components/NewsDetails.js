import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../Supabase"; // ✅ Supabase client
import GoToTop from "../GoToTop";
import { FaCalendarAlt } from "react-icons/fa";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [recentNews, setRecentNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // 🔹 Date formatter
  const formatDate = (createdAt) => {
    if (!createdAt) return "";

    const createdDate = new Date(createdAt);
    const now = new Date();

    const diffMs = now - createdDate;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const getOrdinal = (day) => {
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

    // ✅ If more than 2 days → show full date
    if (diffDays > 2) {
      const day = createdDate.getDate();
      const month = createdDate.toLocaleString("en-GB", { month: "short" });
      const year = createdDate.getFullYear();
      return `${day}${getOrdinal(day)} ${month}, ${year}`;
    }

    if (diffDays > 0) return `${diffDays} days ago`;
    if (diffHours > 0) return `${diffHours} hours ago`;
    if (diffMinutes > 0) return `${diffMinutes} minutes ago`;

    let hours = createdDate.getHours();
    const minutes = createdDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `Today at ${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  };

  // 🔹 Fetch single news
  useEffect(() => {
    const fetchNewsDetails = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setNews(data);
      else console.error(error);

      setLoading(false);
    };

    if (id) fetchNewsDetails();
  }, [id]);

  // 🔹 Fetch recent news
  useEffect(() => {
    const fetchRecentNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (!error) setRecentNews(data);
      else console.error(error);
    };

    fetchRecentNews();
  }, []);

  return (
    <>
      <GoToTop />
      <section>
        <div className="container-fluid my-2" style={{ padding: "0 1.5rem" }}>
          <div className="row">
            {/* LEFT */}
            <div className="col-lg-8">
              {loading ? (
                <p>Loading news...</p>
              ) : news ? (
                <div className="news-item my-3">
                  <h2>{news.headline}</h2>

                  <p className="date_news">
                    <FaCalendarAlt /> {formatDate(news.created_at)}
                  </p>

                  <img
                    src={news.primary_image}
                    alt={news.headline}
                    className="img-fluid newsPrimaryImg my-3"
                  />

                  <p style={{ whiteSpace: "pre-line" }}>
                    {news.description}
                  </p>
                </div>
              ) : (
                <p>News not found</p>
              )}
            </div>

            {/* RIGHT */}
            <div className="col-lg-4">
              {/* Gallery */}
              <h5>News Gallery</h5>
              <div className="row">
                {news?.images?.length > 0 ? (
                  news.images.map((img, i) => (
                    <div key={i} className="col-4 mb-2">
                      <img
                        src={img}
                        alt=""
                        style={{
                          width: "100%",
                          height: "80px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setPhotoIndex(i);
                          setIsOpen(true);
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#aaa" }}>No images available</p>
                )}
              </div>

              {isOpen && (
                <Lightbox
                  mainSrc={news.images[photoIndex]}
                  nextSrc={news.images[(photoIndex + 1) % news.images.length]}
                  prevSrc={
                    news.images[
                      (photoIndex + news.images.length - 1) %
                        news.images.length
                    ]
                  }
                  onCloseRequest={() => setIsOpen(false)}
                  onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % news.images.length)
                  }
                  onMovePrevRequest={() =>
                    setPhotoIndex(
                      (photoIndex + news.images.length - 1) %
                        news.images.length
                    )
                  }
                />
              )}

              {/* Recent News */}
              <div className="mt-3">
                <h5>Recent News</h5>
                {recentNews.length ? (
                  recentNews.map((item) => (
                    <div key={item.id} className="card p-2 mb-2">
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/newsdetail/${item.id}`)}
                      >
                        {item.headline}
                      </p>
                      <p className="date_news mb-0">
                        <FaCalendarAlt /> {formatDate(item.created_at)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No recent news</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewsDetails;
