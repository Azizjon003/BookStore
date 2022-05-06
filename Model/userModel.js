const mongoose = require("mongoose");
// const { schema } = require("./bookModel");

const Schema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  data: {},
});

const Users = mongoose.model("Users", Schema);

module.exports = Users;
