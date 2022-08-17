const router = require('express').Router();
const ErrorResponse = require('../utils/errorResponse');
const { validate } = require('../middlewares/bodyValidator');
const { isAuth } = require('../middlewares/auth');
const { validateProfile } = require('../middlewares/validatorSchemas');
const profileController = require('../controllers/profile');
const uploadHandler = require('../middlewares/google-upload');

router.get('/', isAuth, profileController.getProfile);
router.patch(
  '/',
  isAuth,
  validateProfile,
  validate,
  uploadHandler.any('avatar'),
  profileController.updateProfile
);

module.exports = router;
