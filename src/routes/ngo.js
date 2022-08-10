const router = require('express').Router();

const ngosControllers = require('../controllers/ngosController');

router.get('/id', ngosControllers.getNgo);

module.exports = router;
