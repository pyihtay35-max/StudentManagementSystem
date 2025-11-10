import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function StudentList({ students, setStudents }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`);
      setStudents(students.filter(s => s._id !== id));
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered align-middle text-center">
        <thead className="table-primary">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <Link to={`/edit/${student._id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                <button onClick={() => handleDelete(student._id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
