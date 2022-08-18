const router = require('express').Router();

const ngosControllers = require('../controllers/ngosController');

router.get('/', ngosControllers.getNgos);

router.get('/:id', ngosControllers.getNgo);

router.get('/:id/events', ngosControllers.getNgoEvents);

module.exports = router;
