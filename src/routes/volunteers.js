const router = require('express').Router();
// const { isAuth } = require('../middlewares/auth');
// const { request } = require('chai');

const volunteersController = require('../controllers/volunteers');

router.get('/', volunteersController.getVolunteers);

router.get('/:id', volunteersController.getVolunteers);

module.exports = router;
