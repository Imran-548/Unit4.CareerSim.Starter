require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const client = require("./config/pgClient");
const { findProducts, findUsers } = require("./utils/utils");
const isAdmin = require("./middleware/isAdmin");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));

app.use(isAdmin);
app.use("/api/users", require("./routes/users"));

app.all("*", (req, res) => {
  return res.status(404).json({ error: "404 Not Found" });
});

const init = async () => {
  await client.connect();
  console.log("Connected to Postgres");

  console.log(await findUsers());
  console.log(await findProducts());

  app.listen(port, () => {
    console.log(`Api is listening at http://localhost:${port}`);
  });
};

init();
