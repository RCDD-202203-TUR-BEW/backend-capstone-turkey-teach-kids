const router = require('express').Router();
const { validate } = require('../middlewares/bodyValidator');
const eventsControllers = require('../controllers/events');
const {
  validateAddEvent,
  validateUpdateEvent,
} = require('../middlewares/validatorSchemas');
const { isAuth, isNgo, isVolunteer } = require('../middlewares/auth');

router.get('/', eventsControllers.getEvents);
router.get('/:id', eventsControllers.getEvent);
router.get('/:id/related-events', eventsControllers.getRelatedEvents);
router.post(
  '/',
  isAuth,
  isNgo,
  validateAddEvent,
  validate,
  eventsControllers.addEvent
);
router.post('/:id/apply', isAuth, isVolunteer, eventsControllers.applyToEvent);
router.delete('/:id', isAuth, isNgo, eventsControllers.deleteEvent);
router.patch(
  '/:id',
  isAuth,
  isNgo,
  validateUpdateEvent,
  eventsControllers.updateEvent
);

module.exports = router;
