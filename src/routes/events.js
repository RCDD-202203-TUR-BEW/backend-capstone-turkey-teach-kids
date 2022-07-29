const router = require('express').Router();

const eventsControllers = require('../controllers/events');

router.get('/', eventsControllers.getEvents);

module.exports = router;
