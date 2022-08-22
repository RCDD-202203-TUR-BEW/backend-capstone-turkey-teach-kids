const router = require('express').Router();
const { isAuth } = require('../middlewares/auth');

const volunteersController = require('../controllers/volunteers');

router.get('/:id', isAuth, volunteersController.getVolunteer);

router.get(
  '/:id/applied-events',
  isAuth,
  volunteersController.getAppliedEvents
);

module.exports = router;
