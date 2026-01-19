import React, { useState } from "react";
import { supabase } from "../../../Supabase";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNews() {
  const [headline, setHeadline] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("Karbi Anglong");
  const [description, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [primaryImage, setPrimaryImage] = useState(null);

  /* ---------------- IMAGE HANDLERS ---------------- */

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setImages((prev) => {
      const updated = [...prev, ...files];
      if (primaryImage === null) setPrimaryImage(0);
      return updated;
    });
  };

  const handleImageDelete = (index) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      if (primaryImage === index) {
        setPrimaryImage(updated.length ? 0 : null);
      } else if (primaryImage > index) {
        setPrimaryImage((prev) => prev - 1);
      }

      return updated;
    });
  };

  /* ---------------- IMAGE UPLOAD (WITH TRACKING) ---------------- */

  const uploadImages = async (newsId) => {
    const imageURLs = [];
    const uploadedPaths = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const ext = image.name.split(".").pop();
      const filePath = `${newsId}-${i + 1}.${ext}`;

      const { error } = await supabase.storage
        .from("news_images")
        .upload(filePath, image, { upsert: true });

      if (error) {
        // 🔥 Cleanup already uploaded images
        if (uploadedPaths.length > 0) {
          await supabase.storage
            .from("news_images")
            .remove(uploadedPaths);
        }
        throw error;
      }

      uploadedPaths.push(filePath);

      const { data } = supabase.storage
        .from("news_images")
        .getPublicUrl(filePath);

      imageURLs.push(data.publicUrl);
    }

    return { imageURLs, uploadedPaths };
  };

  /* ---------------- FORM SUBMIT ---------------- */

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!headline || !category || !description) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    let newsId = null;
    let uploadedPaths = [];

    try {
      /* STEP 1: INSERT NEWS (NO IMAGES YET) */
      const { data, error } = await supabase
        .from("news")
        .insert([
          {
            headline,
            category,
            location,
            description,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      newsId = data.id;

      /* STEP 2: UPLOAD IMAGES */
      const uploadResult = await uploadImages(newsId);
      const imageURLs = uploadResult.imageURLs;
      uploadedPaths = uploadResult.uploadedPaths;

      if (!imageURLs.length) {
        throw new Error("Image upload failed");
      }

      const primaryImageURL = imageURLs[primaryImage ?? 0];

      /* STEP 3: UPDATE NEWS WITH IMAGES */
      const { error: updateError } = await supabase
        .from("news")
        .update({
          images: imageURLs,
          primary_image: primaryImageURL,
        })
        .eq("id", newsId);

      if (updateError) throw updateError;

      Swal.fire({
        title: "Success",
        icon: "success",
        text: "News has been posted successfully!",
      });

      // RESET FORM
      setHeadline("");
      setCategory("");
      setDesc("");
      setImages([]);
      setPrimaryImage(null);
    } catch (err) {
      console.error(err);

      /* 🔥 FULL ROLLBACK (STORAGE + DB) */
      if (uploadedPaths.length > 0) {
        await supabase.storage
          .from("news_images")
          .remove(uploadedPaths);
      }

      if (newsId) {
        await supabase.from("news").delete().eq("id", newsId);
      }

      toast.error(
        "Upload failed. News entry and uploaded images have been removed."
      );
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
            <li className="breadcrumb-item active">Add News</li>
          </ol>
        </nav>

        <div className="add-update">
          <form onSubmit={handleForm}>
            <div className="row">
              {/* LEFT */}
              <div className="col-lg-8">
                <label className="form-label">News Headline</label>
                <input
                  className="form-control"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Add Headline"
                />

                <label className="form-label mt-3">
                  News Description
                </label>
                <textarea
                  className="form-control"
                  rows="15"
                  value={description}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              {/* RIGHT */}
              <div className="col-lg-4">
                <label className="form-label">Upload Images</label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {images.length > 0 && (
                  <div className="mt-2">
                    <label>Selected Images</label>
                    <div style={{ maxHeight: "40vh", overflowY: "auto" }}>
                      {images.map((image, index) => (
                        <div
                          key={index}
                          style={{
                            display: "inline-block",
                            marginRight: 8,
                            position: "relative",
                          }}
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt=""
                            onClick={() => setPrimaryImage(index)}
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                              cursor: "pointer",
                              border:
                                primaryImage === index
                                  ? "3px solid green"
                                  : "1px solid #ddd",
                            }}
                          />

                          <button
                            type="button"
                            onClick={() => handleImageDelete(index)}
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              background: "red",
                              color: "#fff",
                              border: "none",
                              borderRadius: "50%",
                              width: 20,
                              height: 20,
                              fontSize: 12,
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
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
                  type="submit"
                  className="btn btn-primary mt-3"
                  style={{ width: "100%" }}
                  disabled={loading}
                >
                  {loading ? "Publishing..." : "Publish"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddNews;
