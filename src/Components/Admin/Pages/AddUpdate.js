import React, { useState } from "react";
import { supabase } from "../../../Supabase";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IoMdSave } from "react-icons/io";
import { GrWaypoint  } from "react-icons/gr";

function AddUpdate() {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [description, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔍 Validation
    if (!title || !department) {
      toast.error("Please provide Title and Department.");
      setLoading(false);
      return;
    }

    if (title.length < 5) {
      toast.error("Title length is too short");
      setLoading(false);
      return;
    }

    if (!description) {
      toast.error("Please write a description.");
      setLoading(false);
      return;
    }

    let insertedId = null;
    let pdfPath = null;

    try {
      // 🟢 STEP 1: Insert row FIRST (without pdf)
      const { data, error } = await supabase
        .from("all_updates")
        .insert([
          {
            title,
            category,
            type,
            year,
            department,
            description,
            status: status || "inactive",
          },
        ])
        .select("id")
        .single();

      if (error) throw error;

      insertedId = data.id;

      // 🟢 STEP 2: Upload PDF (if exists)
      let pdfUrl = null;

      if (pdfFile) {
        pdfPath = `${insertedId}.pdf`;

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

        // 🟢 STEP 3: Update row with pdf_url
        const { error: updateError } = await supabase
          .from("all_updates")
          .update({ pdf_url: pdfUrl })
          .eq("id", insertedId);

        if (updateError) throw updateError;
      }

      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Update posted successfully!",
      });

      // Reset form
      setTitle("");
      setDepartment("");
      setCategory("");
      setType("");
      setYear("");
      setDesc("");
      setStatus("");
      setPdfFile(null);
      setTimeout(() => navigate("/admin-updates"), 1500);
    } catch (err) {
      console.error(err);

      // 🧹 ROLLBACK: delete DB row + PDF if anything fails
      if (insertedId) {
        await supabase
          .from("all_updates")
          .delete()
          .eq("id", insertedId);
      }

      if (pdfPath) {
        await supabase.storage.from("Notifications").remove([pdfPath]);
      }

      toast.error("Failed to post update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div id="main-wrapper">
        <form onSubmit={handleForm}>
          <div className="d-flex justify-content-between">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><GrWaypoint  style={{marginTop:'-3px'}}/> Home</li>
                <li className="breadcrumb-item">Notifications</li>
                <li className="breadcrumb-item active">Add Notification</li>
              </ol>
            </nav>

            <button
              type="submit"
              className="btn btn-success btn-sm"
              disabled={loading}
              // style={{ position: "absolute", right: "20px" }}
            >
              {loading ? (
                "Saving Notification..."
              ) : (
                <>
                  <IoMdSave style={{marginTop:'-3px'}}/> Save Notification
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

              <div className="col-lg-3 my-2">
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

              <div className="col-lg-4 my-2">
                <label className="form-label">Upload PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="form-control"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUpdate;
