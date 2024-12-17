import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  requestType: { type: String, required: true }, // Leave, On-Duty
  dateRange: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  reason: { type: String, required: true },
  documents: [{ type: String }], // File paths for proof documents
  approvers: [
    {
      role: { type: String, required: true },
      approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Approver', required: true },
      status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
      comments: { type: String, default: '' },
      updatedAt: { type: Date },
    },
  ],
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
export default Request;