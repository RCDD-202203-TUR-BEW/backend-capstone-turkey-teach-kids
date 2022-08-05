const router = require('express').Router();
const { validate } = require('../middlewares/bodyValidator');
const eventsControllers = require('../controllers/events');
const { validateEvent } = require('../middlewares/validatorSchemas');
const { isAuth } = require('../middlewares/auth');

router.post('/', validateEvent, validate, isAuth(), eventsControllers.addEvent);

module.exports = router;
