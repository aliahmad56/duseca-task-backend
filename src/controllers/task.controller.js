const adminModel = require('../models/admin.model');
const userModel = require('../models/user.model');
const managerModel = require('../models/manager.model');
const taskModel = require('../models/task.model');

//Note: Due to shortage of time I am not able to well structure the code into services and define dtos
// for validation. I only structure code into services and dtos in auth module.

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const userId = req.userId;
    const role = req.role;
    if (role === 'admin') {
      const userDetails = await adminModel.findById(userId);
      if (!userDetails) {
        return res.status(404).send({
          status: false,
          message: 'Admin not found'
        });
      }
    } else if (role === 'manager') {
      const userDetails = await managerModel.findById(userId);
      if (!userDetails) {
        return res.status(404).send({
          status: false,
          message: 'Manager not found'
        });
      }
    } else if (role === 'user') {
      const userDetails = await userModel.findById(userId);
      if (!userDetails) {
        return res.status(404).send({
          status: false,
          message: 'User not found'
        });
      }
    }

    const newTask = new taskModel({
      title,
      description,
      dueDate,
      status,
      userId
    });

    await newTask.save();
    return res.status(201).send({
      status: true,
      message: 'Task created successfully',
      task: newTask
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message
    });
  }
};

const showUserWithTasks = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User not found'
      });
    }
    const tasks = await taskModel.find({ userId: userId });

    if (!tasks) {
      return res.status(404).json({
        status: false,
        message: 'No task found for this user'
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Task loaded successfully',
      user,
      tasks
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message
    });
  }
};

const updateTasks = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, dueDate } = req.body;

  try {
    const updatedTask = await taskModel.findOneAndUpdate(
      { _id: taskId },
      {
        title,
        description,
        status,
        dueDate
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        status: false,
        message: 'Task not updated'
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Task updated successfully',
      task: updatedTask
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: 'Error updating task'
    });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({
        status: false,
        message: 'Task not found'
      });
    }

    await taskModel.findByIdAndDelete(taskId);

    return res.status(200).json({
      status: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: 'Error deleting task'
    });
  }
};

module.exports = {
  createTask,
  showUserWithTasks,
  updateTasks,
  deleteTask
};
