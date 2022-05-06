const fs = require("fs");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 400;
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader("Acces-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Acces-Contorl-Allow-Methods", "Content-Type", "Authorization");
  next();
});
app.use(morgan("dev"));
const bookRouter = require("./Route/bookRoute.js");
const userRoute = require("./Route/userRoute.js");
const enterRoute = require("./Route/enterRoute.js");
const searchRoute = require("./Route/searchRoute.js");

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/user", enterRoute);
app.use("/api/v1/book", searchRoute);

const DB = `mongodb+srv://azizjon:azizjon3002@books.ihmqs.mongodb.net/BookStore?retryWrites=true&w=majority`;
module.exports = { app, port, DB };
