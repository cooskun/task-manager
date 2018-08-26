const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Models
const User = require("./models/user");
const Task = require("./models/task");

app.use(express.static("client/dist/"));

// Make sure bodyParser has been placed before CRUD operations
app.use(bodyParser.urlencoded({ extended: true }));

// Setup the database
const mongoose = require("mongoose");
const mongoDB = "mongodb://admin:admin1@ds125362.mlab.com:25362/stampen";

mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

// Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(3000, () => {
  console.log("running on 3000");
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/dist/index.html");
});

app.post("/api/create_task", (req, res) => {
  const data = new Task({
    title: req.body.title,
    describe: req.body.describe
  });

  db.collection("tasks").insertOne(data, (err, result) => {
    if (err) return console.log(err);
    res.redirect("/");
  });
});

app.post("/api/create_user", (req, res) => {
  console.log(req.params);
  const data = new User({
    username: req.body.username,
    password: req.body.password,
    status: "developer"
  });

  db.collection("users").insertOne(data, (err, result) => {
    if (err) return console.log(err);
    res.redirect("/");
  });
});

app.get("/api/get_tasks", (req, res) => {
  db.collection("tasks")
    .find({})
    .toArray((err, result) => {
      if (err) return err;
      res.send(result);
    });
});

app.get("/api/get_users", (req, res) => {
  db.collection("users")
    .find({})
    .toArray((err, result) => {
      if (err) return err;
      res.send(result);
    });
});
