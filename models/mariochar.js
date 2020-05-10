const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

// create Schema and model
const MarioCharSchema = new Schema({
  name: String,
  weight: Number,
});

// model
const MarioChar = mongoose.model('marichar'.MarioCharSchema);

module.exports = MarioChar;
