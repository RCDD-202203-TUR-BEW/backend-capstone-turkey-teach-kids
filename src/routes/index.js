const router = require('express').Router();

const usersRoutes = require('./users');
const eventsRoutes = require('./events');
const authRoutes = require('./auth');

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/events', eventsRoutes);

module.exports = router;
