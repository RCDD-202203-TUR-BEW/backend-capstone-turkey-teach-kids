const router = require('express').Router();

const eventsControllers = require('../controllers/events');
//  TODO: AUTH middleware will be added .
router.get('/:id/related-events', eventsControllers.getRelatedEvents);

module.exports = router;
