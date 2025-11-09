import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error("GET / error:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET single student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error("GET /:id error:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST add new student
router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Basic validation
    if (!name || !email || !phone)
      return res.status(400).json({ message: "All fields are required" });

    // Check for duplicate email
    const existing = await Student.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const student = new Student({ name, email, phone });
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error("POST / error:", err);
    res.status(500).json({ message: err.message });
  }
});

// PUT update student
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone)
      return res.status(400).json({ message: "All fields are required" });

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });

    res.json(updatedStudent);
  } catch (err) {
    console.error("PUT /:id error:", err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent)
      return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student deleted" });
  } catch (err) {
    console.error("DELETE /:id error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
