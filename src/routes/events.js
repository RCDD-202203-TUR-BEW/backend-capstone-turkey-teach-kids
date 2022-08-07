const router = require('express').Router();
const { validate } = require('../middlewares/bodyValidator');
const eventsControllers = require('../controllers/events');
const { validateAddEvent } = require('../middlewares/validatorSchemas');
const { isAuth } = require('../middlewares/auth');

router.get('/', eventsControllers.getEvents);
router.post(
  '/',
  isAuth,
  validateAddEvent,
  validate,
  eventsControllers.addEvent
);

module.exports = router;
