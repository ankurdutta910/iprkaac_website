import React, { useEffect, useState } from "react";
import { MdTipsAndUpdates, MdOutlineWifiTethering } from "react-icons/md";
import { FaCalendarAlt, FaHandPointRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../Supabase";
import banner1 from "../Assets/banner1.webp";

function Home() {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState([]);
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

    const suffix = (d) =>
      d > 3 && d < 21 ? "th" : ["th", "st", "nd", "rd"][d % 10] || "th";

    if (days > 7) {
      const d = postedDate.getDate();
      return `${d}${suffix(d)} ${postedDate.toLocaleString("en-GB", {
        month: "short",
      })}, ${postedDate.getFullYear()}`;
    }
    if (days > 0) return `${days} days ago`;
    if (hrs > 0) return `${hrs} hours ago`;
    if (mins > 0) return `${mins} minutes ago`;

    let h = postedDate.getHours();
    const m = postedDate.getMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `Today at ${h}:${m < 10 ? "0" + m : m} ${ampm}`;
  };

  /* ---------------- FETCH UPDATES ---------------- */

  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("all_updates")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (!error) setUpdates(data || []);
      setLoading(false);
    };

    fetchUpdates();
  }, []);

  /* ---------------- FETCH NEWS ---------------- */

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (!error) setNews(data || []);
      setLoading(false);
    };

    fetchNews();
  }, []);

  const [officials, setOfficials] = useState([]);

  // 🔹 Fetch officials
  const fetchOfficials = async () => {
    const { data } = await supabase.from("officials").select("*");
    setOfficials(data || []);
  };

  useEffect(() => {
    fetchOfficials();
  }, []);

  // 🔹 Role mapping
  const dc = officials.find((o) => o.role === "dc");
  const sp = officials.find((o) => o.role === "sp");
  const cem = officials.find((o) => o.role === "cem");
  const em = officials.find((o) => o.role === "em");

  const [heroContent, setHeroContent] = useState("");
  const [heroImages, setHeroImages] = useState([]);


  /* ---------------- FETCH CONTENT ---------------- */
  const fetchThemeContent = async () => {
    const { data } = await supabase
      .from("themecontent")
      .select("hero_content, hero_images")
      .eq("id", 1)
      .single();

    if (data) {
      setHeroContent(data.hero_content || "");
      setHeroImages(data.hero_images || []);
    }
  };

  /* ---------------- FETCH IMAGES ---------------- */
  const fetchImages = async () => {
    const themePhotos = await supabase.storage
      .from("themePhotos")
      .list("", { limit: 100 });

    const newsPhotos = await supabase.storage
      .from("news_images")
      .list("", { limit: 100 });

    const themeUrls =
      themePhotos.data?.map(
        (img) =>
          supabase.storage.from("themePhotos").getPublicUrl(img.name).data
            .publicUrl
      ) || [];

    const newsUrls =
      newsPhotos.data?.map(
        (img) =>
          supabase.storage.from("news_images").getPublicUrl(img.name).data
            .publicUrl
      ) || [];
  };

  /* ---------------- UPLOAD TO THEME PHOTOS ---------------- */

  useEffect(() => {
    fetchThemeContent();
    fetchImages();
  }, []);


  return (
    
    <>
      <section className="section-hero">
        <div className="hero container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="heading-primary">
                Information & Public Relations Department, Karbi Anglong, at a
                glance
              </h1>
              <p className="hero-description">{heroContent}</p>

              <Link
                to="/about"
                style={{ textAlign: "left", marginBottom: "20px" }}
                className="btn btn--fill"
              >
                Learn more &darr;
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="hero-img-slider">
                <div className="carousel-container-hero">
                  <ul>
                    <div className="carousel-content-hero">
                      {heroImages.map((img, index) => (
                        <div className="carousel-item" key={index}>
                          <img src={img} alt="hero" />
                        </div>
                      ))}
                    </div>
                  </ul>
                </div>
              </div>

              <div className="recent-updates">
                <div className="label ripple">
                  <MdTipsAndUpdates className="icon" /> Recent Updates
                </div>
              </div>

              <div className="list-group my-1">
                {loading ? (
                  <>
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-meta"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-meta"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-meta"></div>
                    <div className="skeleton skeleton-text"></div>
                  </>
                ) : updates && updates.length > 0 ? (
                  updates.map((update, index) => (
                    <a
                      key={update.id}
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5
                          className="recent_update_header mb-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/update/${update.id}`)}
                        >
                          {/* {update.title.length > 100
                            ? `${update.title.slice(0, 100)}...`
                            : update.title} */}
                          {update.title}
                        </h5>
                        {/* <small className="text-muted">
                          {formatDate(update.created_at)}
                        </small> */}
                      </div>

                      <small className="recent_update_para text-muted">
                        {update.department} | {update.type} |{" "}
                        {formatDate(update.created_at)}- {update.year}
                      </small>
                    </a>
                  ))
                ) : (
                  <h6 style={{ textAlign: "center" }}>
                    No recent updates available
                  </h6>
                )}

                <Link
                  to="/updates"
                  style={{
                    textAlign: "right",
                    fontSize: "13px",
                    textDecoration: "underlined",
                    cursor: "pointer",
                    color: "#2a75bb",
                  }}
                >
                  View all
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div
          className="container-fluid"
          style={{ marginBottom: "5vh", padding: "0 1.5rem" }}
        >
          <div className="recent-updates my-2">
            <div className="label2 ripple">
              <MdOutlineWifiTethering className="icon" /> Latest News
            </div>
            <div className="news_title2">
              <div className="text-slider-content">
                <p>
                  {news && news.length > 0
                    ? news
                        .map(
                          (update, index) => `${index + 1}. ${update.headline}`
                        ) // Use template strings to concatenate index and headline
                        .join(" | ") // Join headlines with a separator
                    : loading
                    ? "Loading..."
                    : "No latest news available"}
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {news && news.length > 0 ? (
              news.map((update, index) => (
                <div key={update.id} className="col-lg-4 col-md-6">
                  <div className="article__wrapper">
                    <div className="hero-background hero-example-one--bg"></div>
                    <div className="article">
                      <div className="article_media">
                        <img src={update.primary_image} className="news_img" />
                      </div>

                      <div className="article__content">
                        <h2
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/newsdetail/${update.id}`)}
                        >
                          {update.headline.length > 90
                            ? `${update.headline.slice(0, 90)}...`
                            : update.headline}
                        </h2>

                        <p className="date_news">
                          {" "}
                          <FaCalendarAlt className="icon" />{" "}
                          {formatDate(update.created_at)}
                        </p>

                        <h3>
                          <div
                            style={{ color: "black !important" }}
                            dangerouslySetInnerHTML={{
                              __html:
                                update.description.length > 200
                                  ? `${update.description.slice(0, 200)}...`
                                  : update.description,
                            }}
                          ></div>
                        </h3>
                      </div>
                      <div className="article__content article_footer">
                        <Link to={`newsdetail/${update.id}`}>
                          <span style={{ cursor: "pointer" }}>
                            Read more...
                          </span>
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
            <Link
              style={{
                textAlign: "right",
                fontSize: "15px",
                textDecoration: "underlined",
                cursor: "pointer",
                color: "#2a75bb",
              }}
              to="/all-news"
              className="text-center mt-2"
            >
              View all
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mt-5" style={{ marginBottom: "5vh" }}>
          <img src={banner1} className="img-fluid" />
        </div>

        <div
          className="container-fluid mt-5"
          style={{ marginBottom: "5vh", padding: "0 1.5rem" }}
        >
          <div className="row">
            <div className="col-lg-4 mt-1">
              <h5>Karbi Anglong at a Glance</h5>
              <div className="card p-3 mt-3">
                <p className="mb-1">
                  <FaHandPointRight
                    style={{ color: "cornflowerblue", marginTop: "-3px" }}
                  />{" "}
                  Headquarters: <b>Diphu</b>
                </p>
                <p className="mb-1">
                  <FaHandPointRight
                    style={{ color: "cornflowerblue", marginTop: "-3px" }}
                  />{" "}
                  Division: <b>Central Assam</b>
                </p>
                <p className="mb-1">
                  <FaHandPointRight
                    style={{ color: "cornflowerblue", marginTop: "-3px" }}
                  />{" "}
                  Created on: <b>2 February 1970</b>
                </p>
                <p className="mb-1">
                  <FaHandPointRight
                    style={{ color: "cornflowerblue", marginTop: "-3px" }}
                  />{" "}
                  Total Area: <b>10,434 km²</b>
                </p>
                <p className="mb-1">
                  <FaHandPointRight
                    style={{ color: "cornflowerblue", marginTop: "-3px" }}
                  />{" "}
                  Total Population: <b>6,60,955</b>
                  <i> (2011)</i>
                </p>

                <p className="mb-1">
                  <FaHandPointRight
                    style={{ color: "cornflowerblue", marginTop: "-3px" }}
                  />{" "}
                  Major highways: <b>NH-36, NH-39 (AH-1)</b>
                </p>
              </div>
            </div>

            <div className="col-lg-4 mt-2">
              {/* <h5>Karbi Anglong at a Glance</h5> */}
              <div className="card p-3">
                <p className="mb-1">
                  District Commissioners, Diphu Karbi Anglong
                </p>
                <h5>{dc?.name}</h5>
                <small>Email: {dc?.email}</small>
              </div>

              <div className="card p-3 mt-2">
                <p className="mb-1">
                  District Superintendents of Police , Diphu Karbi Anglong
                </p>
                <h5>{sp?.name}</h5>
                <small>Email: {sp?.email}</small>
              </div>
            </div>

            <div className="col-lg-4 mt-2">
              <div className="row">
                {[cem, em].map((item, i) => (
                  <div key={i} className="col-md-6 position-relative">
                    <img src={item?.image} className="img-fluid w-100" alt="" />
                    <div className="card p-2 text-center officialcard">
                      <h5>{item?.name}</h5>
                      <p className="mb-0">{item?.designation}</p>
                      <small>Information & Public Relations</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
