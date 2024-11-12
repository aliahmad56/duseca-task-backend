const managerModel = require('../models/manager.model');
const userModel = require('../models/user.model');

const taskModel = require('../models/task.model');

const showManagerTasks = async (req, res) => {
  try {
    const managerId = req.userId;
    const manager = await managerModel.findById(managerId);
    if (!manager) {
      return res.status(404).json({
        status: false,
        message: 'Manager not found'
      });
    }
    const tasks = await taskModel.find({ userId: managerId });

    if (!tasks) {
      return res.status(404).json({
        status: false,
        message: 'No task found for the manager'
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Task loaded successfully',
      manager,
      tasks
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message
    });
  }
};

const showAllManagers = async (req, res) => {
  try {
    const managerData = await managerModel.find();
    if (!managerData) {
      return res.status(404).json({
        status: false,
        message: 'No manager found'
      });
    }

    return res.status(200).json({
      status: false,
      message: 'Managers loaded successfully',
      manager: managerData
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    });
  }
};

const showUserTasksByManager = async (req, res) => {
  try {
    const { managerId } = req.params;

    const users = await userModel.find({ managerId });

    if (users.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'No users found for this manager'
      });
    }
    console.log('all the users are', users);

    // Get all tasks for the found users
    const userIds = users.map(user => user._id);
    const tasks = await taskModel.find({ userId: { $in: userIds } });

    return res.status(200).json({
      status: true,
      tasks
    });
  } catch (error) {
    console.error('Error getting tasks for manager:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  showManagerTasks,
  showAllManagers,
  showUserTasksByManager
};
