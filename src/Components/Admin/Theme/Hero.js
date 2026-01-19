import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPencilAlt, FaImages, FaUpload } from "react-icons/fa";
import { supabase } from "../../../Supabase";

function Dashboard() {
  const [heroContent, setHeroContent] = useState("");
  const [heroImages, setHeroImages] = useState([]);

  const [allImages, setAllImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [uploading, setUploading] = useState(false);

  const [showTextModal, setShowTextModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const CONTENT_LIMIT = 320;

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
      setSelectedImages(data.hero_images || []);
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

    setAllImages([...themeUrls, ...newsUrls]);
  };

  /* ---------------- UPDATE TEXT ---------------- */
  const updateHeroContent = async () => {
    await supabase
      .from("themecontent")
      .update({ hero_content: heroContent })
      .eq("id", 1);

    setShowTextModal(false);
  };

  /* ---------------- UPDATE IMAGES ---------------- */
  const updateHeroImages = async () => {
    await supabase
      .from("themecontent")
      .update({ hero_images: selectedImages })
      .eq("id", 1);

    setHeroImages(selectedImages);
    setShowImageModal(false);
  };

  /* ---------------- TOGGLE IMAGE ---------------- */
  const toggleImage = (url) => {
    setSelectedImages((prev) =>
      prev.includes(url) ? prev.filter((i) => i !== url) : [...prev, url]
    );
  };

  /* ---------------- UPLOAD TO THEME PHOTOS ---------------- */
  const uploadThemeImages = async (files) => {
    if (!files.length) return;

    setUploading(true);

    for (let file of files) {
      const fileName = `${Date.now()}-${file.name}`;

      await supabase.storage.from("themePhotos").upload(fileName, file);
    }

    setUploading(false);

    // Refresh images after upload
    fetchImages();
  };

  useEffect(() => {
    fetchThemeContent();
    fetchImages();
  }, []);

  return (
    <>
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="section-hero">
        <div className="hero container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <h3>
                Information & Public Relations Department, Karbi Anglong, at a
                glance
              </h3>

              <p className="hero-description mb-2">
                {heroContent}
                <FaPencilAlt
                  onClick={() => setShowTextModal(true)}
                  style={{
                    marginLeft: "8px",
                    cursor: "pointer",
                    color: "red",
                  }}
                />
              </p>

              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => setShowImageModal(true)}
              >
                <FaImages style={{ marginTop: "-3px" }} /> Change Images
              </Button>
            </div>

            <div className="col-lg-6">
              <div className="hero-img-slider">
                <div className="carousel-container-hero">
                  <ul>
                    <div className="carousel-content-hero">
                      {heroImages && heroImages.map((img, index) => (
                        <div className="carousel-item" key={index}>
                          <img src={img} alt="hero" />
                        </div>
                      ))}
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TEXT MODAL ---------------- */}
      <Modal show={showTextModal} onHide={() => setShowTextModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Hero Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={8}
            maxLength={CONTENT_LIMIT}
            value={heroContent}
            onChange={(e) => setHeroContent(e.target.value)}
          />
          <small>
            {heroContent.length}/{CONTENT_LIMIT} characters
          </small>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" onClick={updateHeroContent}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ---------------- IMAGE MODAL ---------------- */}
      <Modal
        size="lg"
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Hero Images</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Upload */}
          <div className="row mb-2">
            <div className="col-6">
              <Form.Group>
                <Form.Label>
                  <FaUpload style={{ marginTop: "-3px" }} /> Upload New Images
                </Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => uploadThemeImages(e.target.files)}
                />
                {uploading && <small>Uploading...</small>}
              </Form.Group>
            </div>

            <div
              className="col-6"
              style={{ textAlign: "right", justifyContent: "right" }}
            >
              <button
                className="btn btn-danger btn-sm"
                size="sm"
                onClick={updateHeroImages}
              >
                Save Selected Images
              </button>
            </div>
          </div>

          {/* Image Grid */}
          <div className="row">
            {allImages &&
              allImages.map((img, i) => (
                <div className="col-md-3 mb-3" key={i}>
                  <img
                    src={img}
                    alt=""
                    onClick={() => toggleImage(img)}
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border: selectedImages.includes(img)
                        ? "3px solid green"
                        : "2px solid #ccc",
                    }}
                  />
                </div>
              ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Dashboard;
