const router = require('express').Router();

const usersRoutes = require('./users');
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const eventsRoutes = require('./events');

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/events', eventsRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
