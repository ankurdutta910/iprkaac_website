import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../Supabase";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseCircle } from "react-icons/io5";

function EditNews() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [headline, setHeadline] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("Karbi Anglong");
  const [description, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [primaryImage, setPrimaryImage] = useState(null);

  /* ---------------- FETCH NEWS ---------------- */

  useEffect(() => {
    const fetchNewsDetails = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        toast.error("Failed to load news");
        return;
      }

      setHeadline(data.headline || "");
      setCategory(data.category || "");
      setLocation(data.location || "Karbi Anglong");
      setDesc(data.description || "");
      setImages(data.images || []);
      setPrimaryImage(data.primary_image || null);
    };

    fetchNewsDetails();
  }, [id]);

  /* ---------------- IMAGE HANDLERS ---------------- */

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const extractFilePath = (url) => {
    try {
      const parts = url.split("/news_images/");
      return parts[1];
    } catch {
      return null;
    }
  };

  const handleImageDelete = async (index) => {
    const imageToDelete = images[index];
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // Delete from Supabase Storage if already uploaded
    if (typeof imageToDelete === "string") {
      const filePath = extractFilePath(imageToDelete);

      if (filePath) {
        await supabase.storage
          .from("news_images")
          .remove([filePath]);
      }

      await supabase
        .from("news")
        .update({ images: updatedImages })
        .eq("id", id);

      if (imageToDelete === primaryImage) {
        setPrimaryImage(null);
        await supabase
          .from("news")
          .update({ primary_image: null })
          .eq("id", id);
      }
    }
  };

  const handleSetPrimaryImage = async (image) => {
    setPrimaryImage(image);

    if (typeof image === "string") {
      await supabase
        .from("news")
        .update({ primary_image: image })
        .eq("id", id);
    }
  };

  /* ---------------- UPLOAD IMAGES ---------------- */

  const uploadImages = async () => {
    const uploadedURLs = [];

    for (const image of images) {
      if (typeof image === "string") {
        uploadedURLs.push(image);
        continue;
      }

      const fileName = `${Date.now()}-${image.name}`;
      const { error } = await supabase.storage
        .from("news_images")
        .upload(fileName, image);

      if (error) {
        throw error;
      }

      const { data } = supabase.storage
        .from("news_images")
        .getPublicUrl(fileName);

      uploadedURLs.push(data.publicUrl);
    }

    return uploadedURLs;
  };

  /* ---------------- SUBMIT FORM ---------------- */

  const handleForm = async (e) => {
    e.preventDefault();

    if (!headline || !location || !description || !category) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const imageURLs = await uploadImages();

      await supabase
        .from("news")
        .update({
          headline,
          category,
          location,
          description,
          images: imageURLs,
          primary_image: primaryImage || imageURLs[0] || null,
        })
        .eq("id", id);

      Swal.fire("Success", "News updated successfully!", "success");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <ToastContainer />
      <div id="main-wrapper">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item">News</li>
            <li className="breadcrumb-item active">Edit News</li>
          </ol>
        </nav>

        <div className="add-update">
          <form onSubmit={handleForm}>
            <div className="row">
              <div className="col-lg-8">
                <label className="form-label">News Headline</label>
                <input
                  className="form-control"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />

                <label className="form-label mt-3">News Description</label>
                <textarea
                  className="form-control"
                  rows="15"
                  value={description}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="col-lg-4">
                <label className="form-label">Upload Images</label>
                <input
                  type="file"
                  multiple
                  className="form-control mb-2"
                  onChange={handleImageChange}
                />

                {images.length > 0 && (
                  <div style={{ maxHeight: "35vh", overflowY: "auto" }}>
                    {images.map((image, index) => (
                      <div
                        key={index}
                        style={{
                          display: "inline-block",
                          marginRight: "8px",
                          marginBottom: "10px",
                          position: "relative",
                        }}
                      >
                        <img
                          src={
                            typeof image === "string"
                              ? image
                              : URL.createObjectURL(image)
                          }
                          alt="preview"
                          style={{
                            width: "115px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />

                        <IoCloseCircle
                          onClick={() => handleImageDelete(index)}
                          style={{
                            position: "absolute",
                            right: "1px",
                            top: "1px",
                            color: "red",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            background: "#fff",
                            borderRadius: "50%",
                          }}
                        />

                        <button
                          type="button"
                          onClick={() => handleSetPrimaryImage(image)}
                          style={{
                            position: "absolute",
                            bottom: "0",
                            left: "0",
                            width: "100%",
                            fontSize: "0.7rem",
                            color: "#fff",
                            border: "none",
                            background:
                              primaryImage === image ? "green" : "#787878",
                          }}
                        >
                          {primaryImage === image
                            ? "Primary"
                            : "Set as Primary"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="form-label mt-3">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">--Select--</option>
                  <option value="Academics">Academics</option>
                  <option value="Sports">Sports</option>
                  <option value="Others">Others</option>
                </select>

                <label className="form-label mt-3">Location</label>
                <input
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <button
                  className="btn btn-primary mt-3"
                  style={{ width: "100%" }}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update News"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditNews;
