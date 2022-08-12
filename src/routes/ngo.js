const router = require('express').Router();

const ngosControllers = require('../controllers/ngosController');

router.get('/', ngosControllers.getNgos);

router.get('/:id/events', ngosControllers.getNgoEvents);

router.get('/:id', ngosControllers.getNgo);


module.exports = router;
