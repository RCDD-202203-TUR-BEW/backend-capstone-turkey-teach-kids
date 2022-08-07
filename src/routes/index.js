const router = require('express').Router();

const eventsRoutes = require('./events');
const usersRoutes = require('./users');
const authRoutes = require('./auth');

router.use('/users', usersRoutes);
router.use('/events', eventsRoutes);
router.use('/auth', authRoutes);

module.exports = router;
