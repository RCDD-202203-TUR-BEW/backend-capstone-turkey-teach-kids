const router = require('express').Router();
const subscribeController = require('../controllers/subscribe');
const { validateSubscribe } = require('../middlewares/validatorSchemas');
const { validate } = require('../middlewares/bodyValidator');

router.post(
  '/subscribe',
  validateSubscribe,
  validate,
  subscribeController.confirmSubscription
);
module.exports = router;
