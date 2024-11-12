const userModel = require('../models/user.model');
const mangerModel = require('../models/manager.model');
const taskModel = require('../models/task.model');

const bcrypt = require('bcryptjs');

//Note: Due to shortage of time I am not able to well structure the code into services and define dtos
// for validation. I only structure code into services and dtos in auth module.

const addUser = async (req, res) => {
  try {
    const userRole = req.role;

    if (userRole !== 'Admin') {
      return res.status(409).json({
        status: false,
        message: 'You are not an admin to create user'
      });
    }
    const { password, email, role, name } = req.body;
    if (role === 'user') {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({ password: hashedPassword, email, name });

      const savedUser = await newUser.save();
      return res.status(201).json({
        status: true,
        message: 'User created Successfully',
        user: savedUser
      });
    } else if (role === 'manager') {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new mangerModel({ password: hashedPassword, email, name });
      const savedUser = await newUser.save();
      return res.status(201).json({
        status: true,
        message: 'Manager created Successfully',
        user: savedUser
      });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      status: false,
      msg: 'Internal Server Error'
    });
  }
};

const displayAllTasks = async (req, res) => {
  try {
    const userRole = req.role;
    if (userRole !== 'Admin') {
      return res.status(409).json({
        status: false,
        message: 'You are not an admin to see all the users tasks'
      });
    }

    const tasks = await taskModel.find();
    if (!tasks) {
      return res.status(404).json({
        status: false,
        message: 'No tasks found'
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Tasks loaded successfully',
      tasks: tasks
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Internal Server error' + error.message
    });
  }
};

const displayAllUsers = async (req, res) => {
  try {
    const userRole = req.role;
    if (userRole !== 'Admin') {
      return res.status(409).json({
        status: false,
        message: 'You are not an admin to see all the users'
      });
    }

    const users = await userModel.find();
    const managers = await mangerModel.find();

    const allUsers = [...users, ...managers];

    return res.status(200).json({
      status: true,
      message: 'Users loaded successfully',
      users: allUsers
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Internal Server error' + error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId, role } = req.query;

    if (role === 'manager') {
      const manager = await mangerModel.findByIdAndDelete(userId);
      if (!manager) {
        return res.status(404).json({
          status: false,
          message: 'Manager not found'
        });
      }
    } else if (role === 'user') {
      const user = await userModel.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({
          status: false,
          message: 'User not found'
        });
      }
    }

    return res.status(200).json({
      status: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: 'Error deleting user'
    });
  }
};

const assignUsersToManager = async (req, res) => {
  try {
    const { managerId, userIds } = req.body;

    const manager = await mangerModel.findById(managerId);
    if (!manager || manager.role !== 'manager') {
      return res.status(404).json({
        status: false,
        message: 'Manager not found'
      });
    }

    await userModel.updateMany({ _id: { $in: userIds }, role: 'user' }, { $set: { managerId } });

    return res.status(200).json({
      status: true,
      message: 'Users assigned to manager successfully'
    });
  } catch (error) {
    console.error('Error assigning users:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  addUser,
  displayAllTasks,
  displayAllUsers,
  deleteUser,
  assignUsersToManager
};
