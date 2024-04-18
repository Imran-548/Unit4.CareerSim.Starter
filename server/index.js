require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const client = require("./config/pgClient");
const { findProducts, findUsers } = require("./utils/utils");
const isAdmin = require("./middleware/isAdmin");
var morgan = require("morgan");

// app.use(morgan("combined"));

const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    withCredentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));

app.all("*", (req, res) => {
  return res.status(404).json({ error: "404 Not Found" });
});

app.use(isAdmin);
app.use("/api/users", require("./routes/users"));

const init = async () => {
  await client.connect();
  console.log("Connected to Postgres");
  app.listen(port, () => {
    console.log(`Api is listening at http://localhost:${port}`);
  });
};

init();
