const router = require('express').Router();

module.exports = router;

const eventsRoutes = require('./events');
const usersRoutes = require('./users');
const authRoutes = require('./auth');
const eventsRoutes = require('./events');

router.use('/events', eventsRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/events', eventsRoutes);

module.exports = router;
