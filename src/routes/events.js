const router = require('express').Router();

const eventsControllers = require('../controllers/events');
//  TODO: AUTH middleware will be added .
router.delete('/:id', eventsControllers.deleteEvent);

module.exports = router;