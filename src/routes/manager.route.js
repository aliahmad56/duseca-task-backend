const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager.controller');
const { userVerifyToken } = require('../middlewares/auth.middleware');

router.get('/manager-tasks', userVerifyToken, managerController.showManagerTasks);
router.get('/show-managers', userVerifyToken, managerController.showAllManagers);
router.get('/tasks/users', userVerifyToken, managerController.showUserTasksByManager);

module.exports = router;
