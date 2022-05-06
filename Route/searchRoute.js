const fs = require("fs");
const express = require("express");
const searchRoute = express.Router();
const search = require("../controller/search");
searchRoute.route("/:search").get(search);
module.exports = searchRoute;
