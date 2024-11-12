const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/signup/user', authController.userSignup);
router.post('/signup/manager', authController.managerSignup);
router.post('/signup/admin', authController.adminSignup);

router.post('/login', authController.userLogin);

module.exports = router;
