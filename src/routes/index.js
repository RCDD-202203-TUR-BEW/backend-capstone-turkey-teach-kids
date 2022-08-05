const router = require('express').Router();

const eventsRoutes = require('./events');
const usersRoutes = require('./users');
const authRoutes = require('./auth');

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/events', eventsRoutes);

module.exports = router;
