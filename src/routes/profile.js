const router = require('express').Router();
const ErrorResponse = require('../utils/errorResponse');

const profileController = require('../controllers/profile');

router.get('/', profileController.getProfile);

module.exports = router;
