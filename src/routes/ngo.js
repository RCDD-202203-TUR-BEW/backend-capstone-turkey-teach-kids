const router = require('express').Router();

const ngosControllers = require('../controllers/ngosController');

router.get('/', ngosControllers.getNgos);

module.exports = router;
