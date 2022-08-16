const router = require('express').Router();

module.exports = router;

const usersRoutes = require('./users');
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const eventsRoutes = require('./events');
const ngoRoutes = require('./ngo');
const volunteersRoutes = require('./volunteers');

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/events', eventsRoutes);
router.use('/profile', profileRoutes);
router.use('/ngos', ngoRoutes);
router.use('/volunteers', volunteersRoutes);

module.exports = router;
