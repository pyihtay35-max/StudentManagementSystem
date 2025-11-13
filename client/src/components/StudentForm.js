import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// ✅ StudentForm component: Add + Edit student data
function StudentForm() {
  // 🎯 Form state
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  // 🌐 API URL from environment variable
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  // 🌀 Load student data if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/students/${id}`)
        .then((res) => setFormData(res.data))
        .catch((err) => console.error("Error fetching student:", err.response?.data || err.message));
    }
  }, [id, API_URL]);

  // 💡 Handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🚀 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // ✏️ Update existing student
        await axios.put(`${API_URL}/students/${id}`, formData);
      } else {
        // ➕ Add new student
        await axios.post(`${API_URL}/students`, formData);
      }
      navigate("/"); // ✅ Redirect to home page after success
    } catch (err) {
      // ⚠️ Clearer error logging
      console.error(
        "Error saving student:",
        err.response?.data || err.message
      );
      alert(
        `Failed to save student: ${err.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">{id ? "Edit Student" : "Add New Student"}</h2>

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Phone Field */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-100">
          {id ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
