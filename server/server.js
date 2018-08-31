const express = require("express");
const app = express();

const Controller = require("./controller");

const bodyParser = require("body-parser");

// Make sure bodyParser has been placed before CRUD operations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("client/dist/"));

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

app.post("/api/create_task", Controller.create_task);
app.post("/api/create_user", Controller.create_user);

app.get("/api/get_users", Controller.get_users);
app.get("/api/get_tasks", Controller.get_tasks);

app.put("/api/update_task/:id", Controller.update_task);

app.delete("/api/delete_user/:id", Controller.delete_user);
app.delete("/api/delete_task/:id", Controller.delete_task);
