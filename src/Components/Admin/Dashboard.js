import React, { useEffect, useState } from "react";
import { GrWaypoint } from "react-icons/gr";
import { FaPencilAlt } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { supabase } from "../../Supabase";
import Hero from "./Theme/Hero";

function Dashboard() {
  const [officials, setOfficials] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [saving, setSaving] = useState(false);

  // 🔹 Fetch officials
  const fetchOfficials = async () => {
    const { data } = await supabase.from("officials").select("*");
    setOfficials(data || []);
  };

  useEffect(() => {
    fetchOfficials();
  }, []);

  // 🔹 Open modal
  const openModal = (item) => {
    if (!item) return;
    setSelected(item);
    setName(item.name || "");
    setDesignation(item.designation || "");
    setEmail(item.email || "");
    setImageUrl(item.image || "");
    setImageFile(null);
    setShow(true);
  };

  // 🔹 Update official + upload image
  const handleUpdate = async () => {
    if (!selected) return;
    setSaving(true);

    let finalImageUrl = imageUrl;

    try {
      // 🖼 Upload new image if selected
      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const fileName = `${selected.role}-${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("officials")
          .upload(fileName, imageFile, {
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("officials")
          .getPublicUrl(fileName);

        finalImageUrl = data.publicUrl;
      }

      // 🟢 Update DB
      const { error } = await supabase
        .from("officials")
        .update({
          name,
          designation,
          email,
          image: finalImageUrl,
          updated_at: new Date(),
        })
        .eq("id", selected.id);

      if (error) throw error;

      setShow(false);
      fetchOfficials();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }

    setSaving(false);
  };

  // 🔹 Role mapping
  const dc = officials.find((o) => o.role === "dc");
  const sp = officials.find((o) => o.role === "sp");
  const cem = officials.find((o) => o.role === "cem");
  const em = officials.find((o) => o.role === "em");

  return (
    <>
      <div id="main-wrapper">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <GrWaypoint /> Home
            </li>
            <li className="breadcrumb-item">Dashboard</li>
          </ol>
        </nav>

        <Hero />

        <div className="row">
          {/* 🔹 LEFT CARDS */}
          <div className="col-lg-4 mt-2">
            <div className="card p-3 mb-2 position-relative">
              <FaPencilAlt
                onClick={() => openModal(dc)}
                style={{
                  position: "absolute",
                  right: 12,
                  bottom: 12,
                  cursor: "pointer",
                  color: "red",
                }}
              />
              <p className="mb-1">
                District Commissioners, Diphu Karbi Anglong
              </p>
              <h5>{dc?.name}</h5>
              <small>Email: {dc?.email}</small>
            </div>

            <div className="card p-3 position-relative">
              <FaPencilAlt
                onClick={() => openModal(sp)}
                style={{
                  position: "absolute",
                  color: "red",
                  right: 12,
                  bottom: 12,
                  cursor: "pointer",
                }}
              />
              <p className="mb-1">
                District Superintendents of Police , Diphu Karbi Anglong
              </p>
              <h5>{sp?.name}</h5>
              <small>Email: {sp?.email}</small>
            </div>
          </div>

          {/* 🔹 RIGHT IMAGE CARDS */}
          <div className="col-lg-5 mt-2">
            <div className="row">
              {[cem, em].map((item, i) => (
                <div key={i} className="col-md-6 position-relative">
                  <FaPencilAlt
                    onClick={() => openModal(item)}
                    style={{
                      position: "absolute",
                      right: 25,
                      top: 15,
                      cursor: "pointer",
                      zIndex: 2,
                    }}
                  />
                  <img
                    src={item?.image}
                    className="img-fluid w-100"
                    style={{
                      height: "250px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
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

      {/* 🔹 EDIT MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Official</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label className="form-label">Name</label>
          <input
            className="form-control mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {selected?.designation !== null && (
            <>
              <label className="form-label">Designation</label>
              <input
                className="form-control mb-2"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </>
          )}

          {selected?.email !== null && (
            <>
              <label className="form-label">Email</label>
              <input
                className="form-control mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          {selected?.image !== null && (
            <>
              <label className="form-label">Change Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate} disabled={saving}>
            {saving ? "Saving..." : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Dashboard;
