const router = require('express').Router();
const eventsControllers = require('../controllers/events');
const { isAuth, isVolunteer, isNgo } = require('../middlewares/auth');

router.get('/', eventsControllers.getEvents);
router.delete('/:id', isAuth, isNgo, eventsControllers.deleteEvent);

router.get('/:id', eventsControllers.getEvent);

router.get('/:id/related-events', eventsControllers.getRelatedEvents);

router.post('/:id/apply', isAuth, isVolunteer, eventsControllers.applyToEvent);

module.exports = router;
