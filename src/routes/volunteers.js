const router = require('express').Router();
const { isAuth } = require('../middlewares/auth');
// const { request } = require('chai');

const ErrorResponse = require('../utils/errorResponse');

const volunteersController = require('../controllers/volunteers');

// router.get('/', volunteersController.getVolunteers);

router.get('/:id', isAuth, volunteersController.getVolunteer);
router.get(
  '/:id/applied-events',
  isAuth,
  volunteersController.getAppliedEvents
);

module.exports = router;
