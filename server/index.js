require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const client = require("./config/pgClient");
const { findProducts } = require("./utils/utils");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/products", require("./routes/products"));
app.use("/api/users", require("./routes/users"));

const init = async () => {
  await client.connect();
  console.log("Connected to Postgres");

  console.table((await client.query("SELECT * FROM users")).rows);
  console.table(await findProducts());

  app.listen(port, () => {
    console.log(`Api is listening at http://localhost:${port}`);
  });
};

init();
