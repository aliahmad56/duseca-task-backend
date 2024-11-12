const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.route');
const adminRoutes = require('./admin.route');
const taskRoutes = require('./task.route');
const managerRoutes = require('./manager.route');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/task', taskRoutes);
router.use('/manager', managerRoutes);

module.exports = router;
