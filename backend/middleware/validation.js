const { body, validationResult } = require('express-validator');

// Validation rules for saving/updating a resume profile
const validateProfile = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 255 })
    .withMessage('Name must be less than 255 characters'),
    
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address')
    .isLength({ max: 255 })
    .withMessage('Email must be less than 255 characters'),

  body('phone')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage('Phone number must be less than 50 characters'),

  body('address')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('Address must be less than 255 characters'),
    
  body('dob')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Date of Birth must be less than 100 characters'),

  body('summary')
    .optional({ nullable: true, checkFalsy: true })
    .trim(),

  body('education')
    .optional()
    .isArray()
    .withMessage('Education must be an array'),

  body('experience')
    .optional()
    .isArray()
    .withMessage('Experience must be an array'),

  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),

  body('certifications')
    .optional()
    .isArray()
    .withMessage('Certifications must be an array'),

  // Middleware to handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateProfile
};
