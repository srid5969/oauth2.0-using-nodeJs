const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecrethere';
const refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign(user, accessTokenSecret, { expiresIn: '1h' });
};

const generateRefreshToken = () => {
  const refreshToken = uuid.v4();
  refreshTokens.push(refreshToken);
  return refreshToken;
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid access token' });
    }

    req.user = user;
    next();
  });
};

const refreshToken = (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const accessToken = generateAccessToken({ username: user.username });
    res.json({ accessToken });
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken,
  refreshToken,
};