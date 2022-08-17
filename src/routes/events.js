const router = require('express').Router();
const { isAuth, isNgo } = require('../middlewares/auth');
const eventsControllers = require('../controllers/events');
//  TODO: a middleware for ngo or volunteer check will be added .
router.get('/', eventsControllers.getEvents);
router.delete('/:id', isAuth, isNgo, eventsControllers.deleteEvent);

router.get('/:id', eventsControllers.getEvent);

router.get('/:id/related-events', eventsControllers.getRelatedEvents);

module.exports = router;
