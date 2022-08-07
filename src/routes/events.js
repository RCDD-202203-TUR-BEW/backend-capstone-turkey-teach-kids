const router = require('express').Router();
const { isAuth } = require('../middlewares/auth');
const eventsControllers = require('../controllers/events');
//  TODO: AUTH middleware will be added .
router.get('/', eventsControllers.getEvents);
router.delete('/:id', isAuth, eventsControllers.deleteEvent);

module.exports = router;
