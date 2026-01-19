import React, { useEffect, useState } from "react";
import { supabase } from "../../../Supabase";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdSave } from "react-icons/io";
import { GrWaypoint } from "react-icons/gr";
import { FaFilePdf } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

function EditUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [description, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [existingPdf, setExistingPdf] = useState(null);

  const [deletingPdf, setDeletingPdf] = useState(false);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // 👈 loader state

  // 🔹 FETCH EXISTING DATA
  useEffect(() => {
    const fetchUpdate = async () => {
      try {
        setFetching(true);

        const { data, error } = await supabase
          .from("all_updates")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        setTitle(data.title || "");
        setDepartment(data.department || "");
        setCategory(data.category || "");
        setType(data.type || "");
        setYear(data.year || "");
        setDesc(data.description || "");
        setStatus(data.status || "");
        setExistingPdf(data.pdf_url || null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load update data");
      } finally {
        setFetching(false);
      }
    };

    fetchUpdate();
  }, [id]);

  // Delete PDF existing
  const handleDeletePdf = async () => {
    if (!existingPdf) return;

    const confirm = await Swal.fire({
      title: "Delete PDF?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });

    if (!confirm.isConfirmed) return;

    try {
      setDeletingPdf(true);

      // Extract file path from public URL
      const filePath = existingPdf.split("/Notifications/")[1];

      // 🗑️ Delete from storage
      const { error: storageError } = await supabase.storage
        .from("Notifications")
        .remove([filePath]);

      if (storageError) throw storageError;

      // 🧹 Remove pdf_url from DB
      const { error: dbError } = await supabase
        .from("all_updates")
        .update({ pdf_url: null })
        .eq("id", id);

      if (dbError) throw dbError;

      setExistingPdf(null);

      Swal.fire("Deleted!", "PDF has been removed.", "success");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete PDF");
    } finally {
      setDeletingPdf(false);
    }
  };

  // 🔹 UPDATE HANDLER
  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || title.length < 5) {
      toast.error("Title must be at least 5 characters long.");
      setLoading(false);
      return;
    }

    if (!department || !description) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    let pdfUrl = existingPdf;
    let pdfPath = null;

    try {
      // 🟢 Upload new PDF if selected
      if (pdfFile) {
        pdfPath = `${id}.pdf`;

        if (existingPdf) {
          await supabase.storage.from("Notifications").remove([pdfPath]);
        }

        const { error: uploadError } = await supabase.storage
          .from("Notifications")
          .upload(pdfPath, pdfFile, {
            upsert: true,
            contentType: "application/pdf",
          });

        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage
          .from("Notifications")
          .getPublicUrl(pdfPath);

        pdfUrl = publicData.publicUrl;
      }

      // 🟢 Update DB
      const { error } = await supabase
        .from("all_updates")
        .update({
          title,
          category,
          type,
          year,
          department,
          description,
          status: status || "inactive",
          pdf_url: pdfUrl,
        })
        .eq("id", id);

      if (error) throw error;

      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Update modified successfully!",
      });

      setTimeout(() => navigate("/admin-updates"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update notification");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 FETCH LOADER UI
  if (fetching) {
    return (
      <div
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        Loading notification details...
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div id="main-wrapper">
        <form onSubmit={handleForm}>
          <div className="d-flex justify-content-between">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <GrWaypoint style={{ marginTop: "-3px" }} /> Home
                </li>
                <li className="breadcrumb-item">Notifications</li>
                <li className="breadcrumb-item active">Edit Notification</li>
              </ol>
            </nav>

            <button
              type="submit"
              className="btn btn-danger btn-sm"
              disabled={loading}
            >
              {loading ? (
                "Updating Notification..."
              ) : (
                <>
                  <IoMdSave style={{ marginTop: "-3px" }} /> Update Notification
                </>
              )}
            </button>
          </div>

          <div className="add-update">
            <div className="row">
              <div className="col-lg-12">
                <label className="form-label">Notification</label>
                <input
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="col-lg-4 my-2">
                <label className="form-label">Department</label>
                <input
                  className="form-control"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </div>

              <div className="col-lg-3 my-2">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">--Select--</option>
                  <option value="Circular">Circular</option>
                  <option value="Council Development Committee">
                    Council Development Committee
                  </option>
                  <option value="Any other document">Any other document</option>
                </select>
              </div>

              <div className="col-lg-3 my-2">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">--Select--</option>
                  <option value="Public">Public</option>
                </select>
              </div>

              <div className="col-lg-2 my-2">
                <label className="form-label">Year</label>
                <select
                  className="form-select"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                >
                  <option value="">--Select--</option>
                  {Array.from({ length: 12 }, (_, i) => 2024 + i).map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-lg-12 my-2">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="8"
                  value={description}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="col-lg-2 my-2">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">--Select--</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="col-lg-8 my-2">
                <div className="d-flex">
                  {/* 📄 PDF PREVIEW */}
                  {existingPdf && (
                    <>
                      <label className="form-label">PDF</label>
                      <div style={{ marginTop: "24px", marginLeft:'-25px' }}>
                        <button
                          type="button"
                          onClick={() => window.open(existingPdf, "_blank")}
                          className="btn btn-dark btn-md me-1"
                        >
                          <FaFilePdf style={{ marginTop: "-3px" }} /> View
                          Existing PDF
                        </button>
                        <button
                          type="button"
                          onClick={handleDeletePdf}
                          disabled={deletingPdf}
                          className="btn btn-danger btn-md me-2"
                        >
                          {deletingPdf ? "Deleting..." : (<FaTrashCan style={{ marginTop: "-3px" }}/>)}
                        </button>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="form-label">Replace PDF</label>
                    <input
                      type="file"
                      accept=".pdf"
                      className="form-control"
                      onChange={(e) => setPdfFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditUpdate;
