const CustomError = require('../errors/customError');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const managerModel = require('../models/manager.model');
const adminModel = require('../models/admin.model');

const jwt = require('jsonwebtoken');

const singupUserService = async userData => {
  try {
    const { name, email, password } = userData;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new CustomError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const userInfo = await user.save();

    if (!userInfo) {
      throw new CustomError('Failed to register user', 400);
    }

    return userInfo;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error.message);
  }
};

const signupAdminService = async adminData => {
  try {
    const { name, email, password } = adminData;

    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      throw new CustomError('Admin already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new adminModel({
      name,
      email,
      password: hashedPassword
    });

    const adminInfo = await admin.save();

    if (!adminInfo) {
      throw new CustomError('Failed to register admin', 400);
    }

    return adminInfo;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error.message);
  }
};

const singupManagerService = async managerData => {
  try {
    const { name, email, password } = managerData;

    const existingManager = await managerModel.findOne({ email });
    if (existingManager) {
      throw new CustomError('Manager already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const manager = new managerModel({
      name,
      email,
      password: hashedPassword
    });

    const managerInfo = await manager.save();

    if (!managerInfo) {
      throw new CustomError('Failed to register manager', 400);
    }

    return managerInfo;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error.message);
  }
};

const findUserByRole = async email => {
  let userDetails = await adminModel.findOne({ email });
  if (userDetails) return { userDetails, role: 'Admin' };

  userDetails = await managerModel.findOne({ email });
  if (userDetails) return { userDetails, role: 'Manager' };

  userDetails = await userModel.findOne({ email });
  if (userDetails) return { userDetails, role: 'RegularUser' };

  throw new CustomError('User not found', 404);
};

const loginUserService = async (email, password) => {
  try {
    const { userDetails, role } = await findUserByRole(email);

    const isPasswordValid = await bcrypt.compare(password, userDetails.password);
    if (!isPasswordValid) {
      throw new CustomError('Invalid password', 400);
    }

    const accessToken = jwt.sign({ userId: userDetails._id, role }, process.env.JWT_SECRET_KEY, {
      expiresIn: '8h'
    });

    return { user: userDetails, accessToken };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error.message);
  }
};

module.exports = {
  singupUserService,
  signupAdminService,
  singupManagerService,
  loginUserService
};
