const fs = require("fs");
const express = require("express");
const bookRouter = express.Router();

const bookControl = require("../controller/bookController");
bookRouter.route("/").get(bookControl.getBook).post(bookControl.postBook);
bookRouter
  .route("/:id")
  .patch(bookControl.patchBook)
  .delete(bookControl.deleteBook);
module.exports = bookRouter;
