const router = require('express').Router();

const usersRoutes = require('./users');
const authRoutes = require('./auth');
const eventsRoutes = require('./events');

router.use('/events', eventsRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

module.exports = router;
