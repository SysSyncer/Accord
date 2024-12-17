import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const login = (req, res) => {
  const { email, password } = req.body;

  try {
    // Check hardcoded Admin credentials
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email: email, role: 'admin' }, // Payload
        process.env.JWT_SECRET,        // Secret key
        { expiresIn: '1d' }            // Expiry
      );
      return res.status(200).json({
        message: 'Welcome Admin',
        token: token,
        role: 'admin',
      });
    }

    return res.status(401).json({ message: 'Invalid admin credentials.' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};