const router = require('express').Router();
const { validate } = require('../middlewares/bodyValidator');
const eventsControllers = require('../controllers/events');
const { validateAddEvent } = require('../middlewares/validatorSchemas');
const { isAuth, isNgo } = require('../middlewares/auth');

router.get('/', eventsControllers.getEvents);
router.post(
  '/',
  isAuth,
  isNgo,
  validateAddEvent,
  validate,
  eventsControllers.addEvent
);

router.get('/:id', eventsControllers.getEvent);

router.get('/:id/related-events', eventsControllers.getRelatedEvents);

module.exports = router;
