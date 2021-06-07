const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const ExerciseSchema = mongoose.model('ExerciseSchema', exerciseSchema);

module.exports = ExerciseSchema;
