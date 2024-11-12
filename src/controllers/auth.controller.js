const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const CustomError = require('../errors/customError');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const {
  singupUserService,
  signupAdminService,
  loginUserService,
  singupManagerService
} = require('../services/auth.service');
const { signupDto, LoginUserDto } = require('../dtos/auth.dto');

// Note: Only for the auth module i structure the code into service with custom error class and Dtos
// for validation. But for the other module due to shortage of time I not follewed the structure.

const userSignup = async (req, res, next) => {
  try {
    const userData = req.body;

    const { error } = signupDto.validate(userData);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const dbUser = await singupUserService(userData);

    return res.status(201).send({
      status: true,
      message: 'User registered successfully',
      userData: dbUser
    });
  } catch (err) {
    next(err);
  }
};

const adminSignup = async (req, res, next) => {
  try {
    const adminData = req.body;

    const { error } = signupDto.validate(adminData);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const dbAdmin = await signupAdminService(adminData);

    return res.status(201).send({
      status: true,
      message: 'Admin registered successfully',
      adminData: dbAdmin
    });
  } catch (err) {
    next(err);
  }
};

const managerSignup = async (req, res, next) => {
  try {
    const managerData = req.body;

    const { error } = signupDto.validate(managerData);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const dbManager = await singupManagerService(managerData);

    return res.status(201).send({
      status: true,
      message: 'Manager registered successfully',
      managerData: dbManager
    });
  } catch (err) {
    next(err);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = LoginUserDto.validate({ email, password });
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { user, accessToken } = await loginUserService(email, password);

    return res.status(200).json({
      status: true,
      message: 'Login successful',
      accessToken,
      user
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  userSignup,
  adminSignup,
  managerSignup,
  userLogin
};
