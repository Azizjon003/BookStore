
const express = require("express");
const userRoute = express.Router();

const users = require("../controller/userRoute");

userRoute.route("/").get(users.getUser).post(users.postUser);
userRoute.route("/:id").patch(users.patchUser).delete(users.deleteuser);
module.exports = userRoute;
