const router = require('express').Router();
const ErrorResponse = require('../utils/errorResponse');
const { validate } = require('../middlewares/bodyValidator');
const { isAuth } = require('../middlewares/auth');
const { validateProfile } = require('../middlewares/validatorSchemas');
const profileController = require('../controllers/profile');

router.get('/', isAuth, profileController.getProfile);
router.patch(
  '/',
  isAuth,
  validateProfile,
  validate,
  profileController.updateProfile
);

module.exports = router;
