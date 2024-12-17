import fs from 'fs';
import path from 'path';

// Middleware to log user login attempts
export const loginLogger = (req, res, next) => {
  const logPath = path.join(process.cwd(), 'logs', 'user-logins.log'); // Adjust path to your project structure
  const { email } = req.body;
  const now = new Date().toISOString();
  const logMessage = `${now} - Login attempt: Email: ${email}\n`;

  // Append log to file
  fs.appendFile(logPath, logMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });

  next();
};