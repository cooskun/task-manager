const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model("Task", taskSchema);
