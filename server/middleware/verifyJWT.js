const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = require("../config/secret");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .send("Access Denied, authentication headers required");

  const token = authHeader.split(" ")[1];
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Invalid Token");
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;
