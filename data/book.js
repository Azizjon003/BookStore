const fs = require("fs");
const mongoose = require("mongoose");

const data = fs.readFileSync(`${__dirname}/books.json`);

