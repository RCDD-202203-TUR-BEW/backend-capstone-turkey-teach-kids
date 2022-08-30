const router = require('express').Router();
const ErrorResponse = require('../utils/errorResponse');
const { validate } = require('../middlewares/bodyValidator');
const { isAuth } = require('../middlewares/auth');
const { validateProfile } = require('../middlewares/validatorSchemas');
const profileController = require('../controllers/profile');
const { upload } = require('../middlewares/google-upload');

router.get('/', isAuth, profileController.getProfile);
router.patch(
  '/',
  isAuth,
  validateProfile,
  validate,
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
  ]),
  profileController.updateProfile
);

module.exports = router;
