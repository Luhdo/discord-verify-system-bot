require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.listen(process.env["PORT"] || 3000);
