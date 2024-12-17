import Request from '../models/Request.js';
import Student from '../models/Student.js';

// 1. Student creates a new request
export const createRequest = async (req, res) => {
  const { requestType, dateRange, reason } = req.body;

  try {
    // Check if the user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied. Students only.' });
    }

    // Get uploaded files (proof documents)
    const documents = req.files?.map((file) => file.path) || [];

    // Fetch student’s approvers
    const student = await Student.findById(req.user.id).populate('approvers.approverId');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Map approvers into the request
    const approverStatuses = student.approvers.map((approver) => ({
      role: approver.role,
      approverId: approver.approverId._id,
      status: 'Pending',
      comments: '',
    }));

    // Create the request
    const request = await Request.create({
      studentId: req.user.id,
      requestType,
      dateRange: JSON.parse(dateRange), // {"startDate": "YYYY-MM-DD", "endDate": "YYYY-MM-DD"}
      reason,
      documents,
      approvers: approverStatuses,
    });

    res.status(201).json({ message: 'Request created successfully', request });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 2. Approver updates request status
export const updateRequestStatus = async (req, res) => {
  const { requestId } = req.params;
  const { status, comments } = req.body;

  try {
    if (req.user.role !== 'approver') {
      return res.status(403).json({ message: 'Access denied. Approvers only.' });
    }

    // Find the request
    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    // Update the approver's status
    const approver = request.approvers.find(
      (app) => app.approverId.toString() === req.user.id
    );
    if (!approver) {
      return res.status(403).json({ message: 'You are not assigned to this request.' });
    }

    approver.status = status;
    approver.comments = comments;
    approver.updatedAt = new Date();

    // Update overall request status
    const allApproved = request.approvers.every((app) => app.status === 'Approved');
    const anyRejected = request.approvers.some((app) => app.status === 'Rejected');

    if (anyRejected) request.status = 'Rejected';
    else if (allApproved) request.status = 'Approved';
    else request.status = 'Pending';

    await request.save();
    res.status(200).json({ message: 'Request status updated successfully', request });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// 3. Fetch requests for students and approvers
export const getRequests = async (req, res) => {
  try {
    let requests;

    if (req.user.role === 'student') {
      requests = await Request.find({ studentId: req.user.id });
    } else if (req.user.role === 'approver') {
      requests = await Request.find({ 'approvers.approverId': req.user.id });
    } else {
      return res.status(403).json({ message: 'Access denied.' });
    }

    res.status(200).json({ requests });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};