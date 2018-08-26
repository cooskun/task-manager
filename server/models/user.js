const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please type an username"]
  },
  password: {
    type: String,
    required: [true, "Please type a password!"]
  },
  status: {
    type: String,
    enum: ["admin", "developer"]
  }
});

module.exports = mongoose.model("User", UserSchema);
