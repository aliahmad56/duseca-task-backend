const express = require('express');
const router = express.Router();
const taskController = require('../../src/controllers/task.controller');

const { userVerifyToken } = require('../../src/middlewares/auth.middleware');

router.post('/create-task', userVerifyToken, taskController.createTask);
router.get('/show-tasks/:userId', userVerifyToken, taskController.showUserWithTasks);
router.put('/update-task/:taskId', userVerifyToken, taskController.updateTasks);
router.delete('/delete-task/:taskId', userVerifyToken, taskController.deleteTask);

module.exports = router;
