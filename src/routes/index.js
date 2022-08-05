const router = require('express').Router();

const usersRoutes = require('./users');
const authRoutes = require('./auth');
const ngoRoutes = require('./ngo');

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/ngos', ngoRoutes);

module.exports = router;
