require("dotenv").config();
let express = require("express");
let bodyParser = require("body-parser");
let app = express();
console.log("Hello World");

app.get("/", function (req, res) {
  res.send("Hello Express");
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  }
  res.json({ message: "Hello json" });
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", function (req, res) {
  res.json({ echo: req.params.word });
});

app.use(bodyParser.urlencoded({ extended: false }));

app
  .route("/name")
  .get(function (req, res) {
    res.json({ name: `${req.query.first} ${req.query.last}` });
  })
  .post(function (req, res) {
    res.json({ name: `${req.body.first} ${req.body.last}` });
  });

module.exports = app;
