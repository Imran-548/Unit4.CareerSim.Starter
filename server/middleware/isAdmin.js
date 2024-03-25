const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = require("../config/secret");

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res
      .status(401)
      .send("Access Denied, authentication headers required");

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Invalid Token");
    }
    admin = decoded.admin;
    if (!admin) {
      return res.status(401).send("Access Denied, Admin Only");
    }
    req.user = decoded;
    next();
  });
};

module.exports = isAdmin;
