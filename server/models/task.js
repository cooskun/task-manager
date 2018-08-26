const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  describe: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Task", taskSchema);
