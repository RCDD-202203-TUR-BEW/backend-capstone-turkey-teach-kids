const router = require('express').Router();
const ErrorResponse = require('../utils/errorResponse');
const { isAuth } = require('../middlewares/auth');

const profileController = require('../controllers/profile');

router.get('/', isAuth, profileController.getProfile);
router.patch('/', isAuth, profileController.updateProfile);

module.exports = router;
