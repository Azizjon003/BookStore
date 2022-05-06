const Books = require("../Model/bookModel");
const search = async (req, res) => {
  try {
    const search = req.params.search.replace(/\s/g, "").toLowerCase();
    console.log(search);
    const data = await Books.find();
    let obj = data.filter((val) =>
      val.name.replace(/\s/g, "").toLowerCase().includes(search)
    );
    if (!obj[0]) {
      console.log(obj);
      obj = data.filter((val) =>
        val.autor.replace(/\s/g, "").toLowerCase().includes(search)
      );
      res.status(200).json({
        status: "succes",
        data: obj,
      });
      console.log(obj);
    } else {
      res.status(200).json({
        status: "succes",
        data: obj,
      });
    }
  } catch (er) {
    res.status(404).json({
      status: "fail",
      data: "obj",
    });
  }
};
module.exports = search;
