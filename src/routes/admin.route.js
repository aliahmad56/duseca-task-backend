const express = require('express');
const router = express.Router();
const adminController = require('../../src/controllers/admin.controller');
const { userVerifyToken } = require('../middlewares/auth.middleware');

router.post('/add-user', userVerifyToken, adminController.addUser);
router.get('/tasks', userVerifyToken, adminController.displayAllTasks);
router.get('/show-users', userVerifyToken, adminController.displayAllUsers);
router.delete('/delete-user', userVerifyToken, adminController.deleteUser);
router.post('/assign-users', userVerifyToken, adminController.assignUsersToManager);

module.exports = router;
