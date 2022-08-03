const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  if (req.cookies) {
    const { token } = req.cookies;
    if (!token) {
      res.sendStatus(401);
    } else {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    }
  }
};

module.exports = { isAuth };
