const router = require('express').Router();

const usersRoutes = require('./users');
const profileRoutes = require('./profile');

router.use('/users', usersRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
