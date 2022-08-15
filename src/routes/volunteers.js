const router = require('express').Router();
const { isAuth } = require('../middlewares/auth');
// const { request } = require('chai');

const volunteersController = require('../controllers/volunteers');

// router.get('/', volunteersController.getVolunteers);

router.get('/:id', isAuth, volunteersController.getVolunteer);

module.exports = router;
