const express = require("express");
const app = express();

const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();

const { RateLimiterMemory } = require("rate-limiter-flexible");
const bodyParser = require("body-parser");

// means that the rate limiter will allow 5 requests per second
const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 points
  duration: 1, // Per second
});

app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });
});

app.use(cors());
app.use(helmet());
app.use(
  bodyParser.json({
    limit: "1mb",
  })
);

app.get("/", (req, res) => {
  res.cookie("name", "express123", {
    secure: true,
    httpOnly: true,
  });

  console.log("hello world");
  res.send(`Hello World from ${process.env.NODE_ENV}`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
