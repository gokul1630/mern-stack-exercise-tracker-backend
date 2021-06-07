const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
    },
  },
  { timestamps: true }
);

const UserSchema = mongoose.model('UserSchema', userSchema);

module.exports = UserSchema;
