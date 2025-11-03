const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First message astleast 3 char long'),
    body('password').isLength({ min: 6 }).withMessage('password must be atleast 6 char long')

],
    userController.registerUser
);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('password must be atleast 6 char long')
],
    userController.LoginUser
);










module.exports = router;