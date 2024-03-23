const express = require("express");
const router = express.Router();

//Get all order
router.get("/", (req, res) => {
  res.send("Hello From Auth!");
});

// get order by id
router.get("/", (req, res) => {
  res.send("Hello From Auth!");
});

// create order
router.post("/", (req, res) => {
  res.send("Hello From Auth!");
});

// update order
router.put("/", (req, res) => {
  res.send("Hello From Auth!");
});

// delete order
router.delete("/", (req, res) => {
  res.send("Hello From Auth!");
});

module.exports = router;
