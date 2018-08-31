const User = require("./models/user");
const Task = require("./models/task");

// CREATE
exports.create_task = (req, res) => {
  const data = new Task({
    title: req.body.title,
    isCompleted: false
  });

  Task.create(data, (err, result) => {
    if (err) return console.log(err);
    res.redirect("/");
  });
};

exports.create_user = (req, res) => {
  const data = new User({
    username: req.body.username,
    password: req.body.password,
    status: "developer"
  });

  User.create(data, (err, result) => {
    if (err) return err;
    res.redirect("/");
  });
};

// READ
exports.get_tasks = (req, res) => {
  Task.find({}, (err, result) => {
    if (err) return err;
    res.send(result);
  });
};

exports.get_users = (req, res) => {
  User.find({}, (err, result) => {
    if (err) return err;
    res.send(result);
  });
};

// UPDATE
exports.update_task = (req, res) => {
  Task.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    (err, res) => {
      if (err) return err;
      console.log(res);
    }
  );
};

// DELETE
exports.delete_user = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, res) => {
    if (err) return err;
    console.log(res);
  });
};

exports.delete_task = (req, res) => {
  Task.findByIdAndRemove(req.params.id, (err, res) => {
    if (err) return err;
    console.log(res);
  });
};
