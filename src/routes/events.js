const router = require('express').Router();
const { validate } = require('../middlewares/bodyValidator');
const eventsControllers = require('../controllers/events');
const {
  validateAddEvent,
  validateUpdateEvent,
} = require('../middlewares/validatorSchemas');
const { isAuth, isNgo, isVolunteer } = require('../middlewares/auth');
const { upload } = require('../middlewares/google-upload');

router.get('/', eventsControllers.getEvents);
router.get('/:id', eventsControllers.getEvent);
router.get('/:id/related-events', eventsControllers.getRelatedEvents);
router.post(
  '/',
  isAuth,
  isNgo,
  validateAddEvent,
  validate,
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  eventsControllers.addEvent
);
router.post('/:id/apply', isAuth, isVolunteer, eventsControllers.applyToEvent);
router.delete('/:id', isAuth, isNgo, eventsControllers.deleteEvent);

router.post(
  '/:id/pending-applicants/:userId/approve',
  isAuth,
  isNgo,
  eventsControllers.approveApplicant
);
router.get(
  '/:id/pending-applicants',
  isAuth,
  isNgo,
  eventsControllers.getPendingApplicants
);
router.patch(
  '/:id',
  isAuth,
  isNgo,
  validateUpdateEvent,
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  eventsControllers.updateEvent
);

module.exports = router;
