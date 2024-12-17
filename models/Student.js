import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentID: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  password: { type: String, required: true },
  approvers: [
    {
      role: { type: String, required: true },
      approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Approver' },
    },
  ],
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
export default Student;