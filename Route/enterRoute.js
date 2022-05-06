
const express = require("express");
const enterRoute = express.Router();
const enterAcount = require("../controller/enterRoute")
enterRoute.route("/").post(enterAcount);
module.exports = enterRoute;
