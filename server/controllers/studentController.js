import Student from '../models/Student.js';
import Approver from '../models/Approver.js';
import argon2 from 'argon2';

export const registerStudent = async (req, res) => {
  const { name, studentID, email, department, password, approvers } = req.body;

  try {
    // Hash password
    const hashedPassword = await argon2.hash(password);

    // Map approvers
    const approverMappings = [];
    for (const approverEmail of approvers) {
      const approver = await Approver.findOne({ email: approverEmail });
      if (!approver) {
        return res
          .status(404)
          .json({ message: `Approver with email ${approverEmail} not found` });
      }
      approverMappings.push({ role: approver.role, approverId: approver._id });
    }

    // Create student
    const student = await Student.create({
      name,
      studentID,
      email,
      department,
      password: hashedPassword,
      approvers: approverMappings,
    });

    res.status(201).json({
      message: 'Student registered successfully',
      student,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};