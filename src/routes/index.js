const router = require('express').Router();

const eventsRoutes = require('./events');
const usersRoutes = require('./users');

router.use('/users', usersRoutes);
router.use('/events', eventsRoutes);

module.exports = router;
