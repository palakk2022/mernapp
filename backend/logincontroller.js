// loginController.js
const { body, validationResult } = require('express-validator');

// Validation rules
const loginValidationRules = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password','incorrect password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Login handler function
const loginHandler = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Add your login logic here
  res.send('Login successful');
};

module.exports = {
  loginValidationRules,
  loginHandler
};
