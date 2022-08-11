const router = require('express').Router();

const volunteerControllers = require('../controllers/volunteers');
//  TODO: AUTH middleware will be added.

const { isAuth } = require('../middlewares/auth');

router.get(
  '/:id/applied-events',
  isAuth,
  volunteerControllers.getAppliedEvents
);

module.exports = router;
