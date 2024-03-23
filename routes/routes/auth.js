const express = require("express");
const router = express.Router();
const { createUser, findUserByEmail, updateToken } = require("../utils/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret =
  "tuZXlOCFeHLE9Zcon3dpQv6OECVX47WErYeFRSDiGJylwqNfjIiZ1enmRoVqXHXVwMEtB90ZqfXiF9dzGBDnR78smqpviennp2bvI17idaUMKisriGg0iz1lXc5RF0m63q0MW1LvOI7qqyfx0HNWZzTd05gGxiGILX1koSQm1mO4ZDdCNIFa8MwIvAmxZFBjP6H89LpOtPyBo7F6wNAswV9E0Zw0husasARJPynW9NZrGKVKH6VRIRn3TLS2NouveWrNlWkJG5mv3e8Fv0mPl8db785j49IUzRp3FqIxVk1PhWu5fCDSxs4FVSZipQKr";

router.post("/register", async (req, res) => {
  // We will create the register logic here
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(204).send("Email and Password are required");
  }

  const user = await findUserByEmail(email);
  if (user) return res.status(400).send("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10); // We hashed the password
  const newUser = await createUser(email, hashedPassword); // We create the user

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, secret, {
    expiresIn: "7d",
  }); // We are generating the token
  await updateToken(newUser.id, token); // Here we are only updating the generated token to the database

  res.status(201).json({
    message: "User created successfully",
    user: { email: newUser.email, id: newUser.id, token },
  }); // We are sending the user data and the token to the client
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(204).send("Email and Password are required");
  }

  const user = await findUserByEmail(email);

  if (!user) return res.status(404).send("No account found");

  const validPassord = await bcrypt.compare(password, user.password);
  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "7d",
  }); // here we generate the token

  await updateToken(user.id, token); // Here we are only updating the generated token to the database

  if (validPassord)
    res.status(201).json({
      message: "Login complete",
      user: { email: user.email, id: user.id, token },
    });
});

module.exports = router;
