const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const Schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  autor: {
    type: String,
    trim: true,
    required: true,
  },
  year: {
    type: String,
    trim: true,
    required: true,
  },
  janr: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Books = mongoose.model("Books", Schema);
module.exports = Books;
