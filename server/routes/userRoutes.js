// server/routes/userRoutes.js
const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const fillForm = require('../../automation/fillForm');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/', upload.single('document'), async (req, res) => {
  try {
    const userData = req.body;
    const document = req.file;

    // Create and save user
    const user = new User({
      ...userData,
      documentPath: document.path,
    });
    await user.save();

    // Trigger automation
    await fillForm(user);

    res.json({ message: 'Data submitted and form filled successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.' });
  }
});

module.exports = router;
