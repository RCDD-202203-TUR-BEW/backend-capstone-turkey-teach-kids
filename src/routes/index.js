const router = require('express').Router();

const usersRoutes = require('./users');
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const eventsRoutes = require('./events');
const ngoRoutes = require('./ngo');
const volunteerRoutes = require('./volunteers');

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/events', eventsRoutes);
router.use('/profile', profileRoutes);
router.use('/ngos', ngoRoutes);
router.use('/volunteers', volunteerRoutes);

module.exports = router;
