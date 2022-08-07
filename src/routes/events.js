const router = require('express').Router();

const eventsControllers = require('../controllers/events');
const { isAuth } = require('../middlewares/auth');

router.get('/', eventsControllers.getEvents);
router.post('/:id/apply', isAuth, eventsControllers.applyToEvent);

module.exports = router;
