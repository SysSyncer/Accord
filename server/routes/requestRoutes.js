import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  createRequest,
  updateRequestStatus,
  getRequests,
} from '../controllers/requestController.js';

const router = express.Router();

// Student creates a request (with file uploads)
router.post('/create', verifyToken, upload.array('documents', 5), createRequest);

// Approver updates request status
router.put('/update/:requestId', verifyToken, updateRequestStatus);

// Fetch requests for students/approvers
router.get('/', verifyToken, getRequests);

export default router;