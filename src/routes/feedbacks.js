const router = require('express').Router();
const { validate } = require('../middlewares/bodyValidator');
const feedbackController = require('../controllers/feedbacks');
const { validateFeedback } = require('../middlewares/validatorSchemas');

router.post('/', validateFeedback, validate, feedbackController.addFeedback);

module.exports = router;
