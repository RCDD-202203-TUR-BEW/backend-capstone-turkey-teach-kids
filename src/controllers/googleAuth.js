const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../middlewares/validation');
require('../middlewares/passport');

exports.authenticationCookie = async (req, res) => {
  const { name, email, providerId, profilePicture, _id } = req.user;
  const userInToken = {
    id: _id,
    name,
    email,
    providerId: `google-${providerId}`,
    avatar: profilePicture,
  };

  const token = jwt.sign(userInToken, SECRET_KEY, {
    expiresIn: '336h',
  });

  res.cookie('token', token, {
    httpOnly: true,
  });

  res.redirect('/');
};

exports.loggedInUser = async () => {
  // eslint-disable-next-line no-unused-expressions, no-shadow
  (req, res) => {
    const { name, email } = req.user;
    const clientUser = {
      name,
      email,
    };
    res.status(200).json(clientUser);
  };
};
exports.logout = async () => {
  // eslint-disable-next-line no-unused-expressions, no-shadow
  (req, res) => {
    res.clearCookie('token').sendStatus(200).redirect('/');
  };
};
