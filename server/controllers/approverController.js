import Approver from '../models/Approver.js';

export const registerApprover = async (req, res) => {
  const { name, email, role, department } = req.body;

  try {
    // Create approver
    const approver = await Approver.create({ name, email, role, department });

    res.status(201).json({
      message: 'Approver registered successfully',
      approver,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};