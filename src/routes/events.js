const router = require('express').Router();

const eventsControllers = require('../controllers/events');
//  TODO: AUTH middleware will be added .
router.get('/', eventsControllers.getEvents);
router.get('/:id/related-events', eventsControllers.getRelatedEvents);

module.exports = router;
