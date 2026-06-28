const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const auth = require('../middleware/auth');
const { validateProfile } = require('../middleware/validation');

// All resume routes are protected by the host app auth middleware
router.use(auth);

// GET active profile details
router.get('/profile', resumeController.getProfile);

// POST save/update active profile details
router.post('/profile', validateProfile, resumeController.saveProfile);

// GET available templates list
router.get('/templates', resumeController.getTemplates);

// POST generate PDF and write entry in resumes table with consent flag
router.post('/generate', resumeController.generatePdf);

module.exports = router;
