const router = require('express').Router();
const { isAuth, isNgo } = require('../middlewares/auth');
const eventsControllers = require('../controllers/events');
//  TODO: AUTH middleware will be added .
router.get('/', eventsControllers.getEvents);

router.get('/:id', eventsControllers.getEvent);

router.get('/:id/related-events', eventsControllers.getRelatedEvents);

router.post(
  '/:id/pending-applicants/:userId/approve',
  // isAuth,

  // isNgo,
  eventsControllers.approveApplicant
);

module.exports = router;
