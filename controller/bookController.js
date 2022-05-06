const mongoose = require("mongoose");
const Books = require("../Model/bookModel");
const getBook = async (req, res) => {
  try {
    const query = { ...req.query };

    const deleteSort = ["sort", "page", "limit", "field"];
    deleteSort.forEach((val) => {
      delete query[val];
    });
    const SortQuery = JSON.stringify(query)
      .replace(/\bgt\b/g, "$gt")
      .replace(/\blt\b/g, "$lt")
      .replace(/\bgte\b/g, "$gte")
      .replace(/\blte\b/g, "$lte");
    console.log(SortQuery);

    let data = Books.find(JSON.parse(SortQuery));
    if (req.query.sort) {
      const sortdata = req.query.sort.split(",").join(" ");

      data = data.sort(sortdata);
    }

    if (req.query.field) {
      console.log(req.query);
      const fieldData = req.query.field.split(",").join(" ");
      console.log(fieldData);
      data = data.select(fieldData);
    }
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 4;
    console.log(limit);
    const skkip = (page - 1) * limit;
    data = data.skip(skkip).limit(limit);
    if (req.query.page) {
      const numberOf = await Books.countDocuments();
      if (numberOf <= skkip) {
        throw new Error("paginationda xatolik bor");
      }
    }
    data = await data;
    if (!data.length) throw new Error("Xato");
    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (er) {
    res.status(404).json({
      status: "fail",
      data: er.message,
    });
  }
};
const postBook = async (req, res) => {
  try {
    const body = req.body.data;
    // console.log(body);
    const data = await Books.find();
    let constId = data[0].id - 0;
    for (let i = 0; i < data.length; i++) {
      if (constId < Number(data[i].id)) constId = Number(data[i].id);
    }
    const id = constId + 1;
    const complate = Object.assign({ id: id }, body);
    console.log(complate);
    const dataBook = await Books.create(complate);
    console.log(dataBook);
    res.status(200).json({
      status: "success",
      data: dataBook,
    });
  } catch (er) {
    res.status(404).json({
      status: "fail",
      data: "Data not found",
    });
  }
};
const patchBook = async (req, res) => {
  try {
    const id = +req.params.id;
    const objBody = req.body;
    const data = await Books.find();
    const idMd = data.find((val) => {
      return val.id == id;
    })._id;
    // console.log(idMd);
    const uzgar = await Books.findByIdAndUpdate(idMd, objBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: uzgar,
    });
  } catch (er) {
    res.status(404).json({
      status: "fail",
      data: "data not Found",
    });
  }
};
const deleteBook = async (req, res) => {
  try {
    const id = +req.params.id;
    const data = await Books.find();
    const idMd = data.find((val) => {
      return val.id == id;
    })._id;
    // console.log(idMd);
    const deleteDB = await Books.findByIdAndDelete(idMd);

    res.status(200).json({
      status: "success",
      data: deleteDB,
    });
  } catch (er) {
    res.status(404).json({
      status: "fail",
      data: "delete not data",
    });
  }
};
module.exports = { getBook, postBook, patchBook, deleteBook };
