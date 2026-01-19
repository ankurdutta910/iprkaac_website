import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { supabase } from "../../Supabase";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { GrWaypoint } from "react-icons/gr";

function DeputyDirectors() {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    from_date: "",
    to_date: "",
  });

  /* ---------- DATE FORMAT ---------- */
  const formatDate = (dateValue) => {
    if (!dateValue) return <b style={{ color: "red" }}>N/A</b>;
    const [year, month, day] = dateValue.split("-");
    return `${day}-${month}-${year}`;
  };

  /* ---------- FETCH ---------- */
  const fetchDirectors = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("deputy_directors")
      .select("*")
      .order("from_date", { ascending: true });

    if (!error) setDirectors(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchDirectors();
  }, []);

  /* ---------- FORM ---------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setIsEdit(false);
    setFormData({ id: null, name: "", from_date: "", to_date: "" });
    setShowModal(true);
  };

  const openEditModal = (director) => {
    setIsEdit(true);
    setFormData(director);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.from_date)
      return alert("Required fields missing");

    if (isEdit) {
      await supabase
        .from("deputy_directors")
        .update({
          name: formData.name,
          from_date: formData.from_date,
          to_date: formData.to_date || null,
        })
        .eq("id", formData.id);
    } else {
      await supabase.from("deputy_directors").insert([
        {
          name: formData.name,
          from_date: formData.from_date,
          to_date: formData.to_date || null,
        },
      ]);
    }

    setShowModal(false);
    fetchDirectors();
  };

  return (
    <>
      <div id="main-wrapper">
        <div className="d-flex justify-content-between">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <GrWaypoint /> Home
              </li>
              <li className="breadcrumb-item">Deputy Directors</li>
            </ol>
          </nav>

          <button className="btn btn-primary btn-sm" onClick={openAddModal}>
            <FaPlus /> Add New Director
          </button>
        </div>

        <Table className="table table-striped table-bordered mt-2">
          <thead className="table_header">
            <tr>
              <th className="text-center">#</th>
              <th>Name of Director</th>
              <th>From Date</th>
              <th>To Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {directors.length > 0 ? (
              directors.map((d, index) => (
                <tr key={d.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{d.name}</td>
                  <td>{formatDate(d.from_date)}</td>
                  <td>{formatDate(d.to_date)}</td>
                  <td className="text-center">
                    <FaPencilAlt
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => openEditModal(d)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  {loading ? "Loading..." : "No data available"}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEdit ? "Edit Director" : "Add Director"}
                  </h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <input
                    className="form-control mb-3"
                    placeholder="Director Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <label>From Date</label>
                  <input
                    type="date"
                    className="form-control mb-3"
                    name="from_date"
                    value={formData.from_date}
                    onChange={handleChange}
                  />

                  <label>To Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="to_date"
                    value={formData.to_date || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    {isEdit ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}

export default DeputyDirectors;
