const jwt = require('jsonwebtoken');

// Middleware to verify token and role
const verifyTokenAndRole = (role) => {
  return (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

      if (decoded.role !== role) return res.status(403).send({ auth: false, message: 'Unauthorized role.' });

      req.userId = decoded.id;
      next();
    });
  };
};

module.exports = verifyTokenAndRole;