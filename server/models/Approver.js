import mongoose from 'mongoose';

const approverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true }, // HOD, Class Advisor, Warden, Caretaker
  department: { type: String, required: true },
}, { timestamps: true });

const Approver = mongoose.model('Approver', approverSchema);
export default Approver;