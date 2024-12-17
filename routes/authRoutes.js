import express from 'express';
import { login } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { registerApprover } from '../controllers/approverController.js';
import { registerStudent } from '../controllers/studentController.js';

const router = express.Router();

// Public Route: Admin Login
router.post('/login', login);

// Admin-Only Routes
router.post('/register/approver', verifyToken, registerApprover);
router.post('/register/student', verifyToken, registerStudent);

export default router;