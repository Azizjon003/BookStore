const mongoose = require("mongoose");
const Books = require("./Model/bookModel");
const Users = require("./Model/userModel");
const app = require("./index");
const DB = app.DB;

mongoose
  .connect(DB)
  .then((res) => {
    console.log("Connect To Book Store");
  })
  .catch((err) => {
    console.log("error Book connected");
  });

app.app.listen(app.port, "127.0.0.1");
