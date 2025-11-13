import React, { useState, useEffect } from "react";
import StudentList from "../components/StudentList";
import axios from "axios";

function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("https://studentmanagementsystem-5-s9ia.onrender.com/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">Student List</h2>
      <StudentList students={students} setStudents={setStudents} />
    </div>
  );
}

export default Home;
