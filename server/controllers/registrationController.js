import Approver from '../models/Approver.js';
import Student from '../models/Student.js';
import argon2 from 'argon2';

// Register a new Approver (Admin Only)
export const registerApprover = async (req, res) => {
  const { name, email, role, department, password } = req.body;

  try {
    // Hash password for the new approver
    const hashedPassword = await argon2.hash(password);

    // Create approver in database
    const approver = await Approver.create({
      name,
      email,
      role,
      department,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Approver registered successfully', approver });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Register a new Student (Admin Only)
export const registerStudent = async (req, res) => {
  const { name, studentID, email, department, password, approvers } = req.body;

  try {
    // Hash password for the new student
    const hashedPassword = await argon2.hash(password);

    // Map approvers to their IDs
    const approverMappings = [];
    for (const email of approvers) {
      const approver = await Approver.findOne({ email });
      if (!approver) {
        return res.status(404).json({ message: `Approver with email ${email} not found` });
      }
      approverMappings.push({ role: approver.role, approverId: approver._id });
    }

    // Create student in database
    const student = await Student.create({
      name,
      studentID,
      email,
      department,
      password: hashedPassword,
      approvers: approverMappings,
    });

    res.status(201).json({ message: 'Student registered successfully', student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};