const router = require('express').Router();

const ngosControllers = require('../controllers/ngosController');

router.get('/', ngosControllers.getNgos);

router.get('/:id', ngosControllers.getNgo);

router.get('/:id/events', ngosControllers.getNgoEvents);
router.get('/:id/events/filter', ngosControllers.getFilteredNgoEvents);
module.exports = router;
