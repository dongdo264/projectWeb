const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      }
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};

const verifyTokenAndAgent = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.role === 3 || req.user.role === 10) {
        next();
      } else {
        res.status(403).json("You're not allowed to do that!");
      }
    });
  };
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 10) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};
const verifyTokenAndWcCenter = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.role === 2 || req.user.role === 10) {
        next();
      } else {
        res.status(403).json("You're not allowed to do that!");
      }
    });
  };
  const verifyTokenAndFatory = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.roke === 1 || req.user.role === 10) {
        next();
      } else {
        res.status(403).json("You're not allowed to do that!");
      }
    });
  };

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAgent,
    verifyTokenAndFatory,
    verifyTokenAndWcCenter
}