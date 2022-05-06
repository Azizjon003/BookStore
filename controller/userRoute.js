const mongoose = require("mongoose");
const Users = require("../Model/userModel");

const getUser = async function (req, res) {
  try {
    const data = await Users.find();
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (er) {
    res.status(200).json({
      status: "fail",
      data: "not Found",
    });
  }
};

const postUser = async (req, res) => {
  try {
    let reqData = req.body;
    const userData = await Users.find();
    let constId = userData[0].id - 0;
    for (let i = 0; i < userData.length; i++) {
      if (constId < Number(userData[i].id)) constId = Number(userData[i].id);
    }
    const id = constId + 1;
    console.log(reqData);
    const complate = Object.assign({ id: id }, reqData);
    const data = await Users.create(complate);
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (er) {
    res.status(404).json({
      status: "fail",
      data: "secured",
    });
  }
};
const patchUser = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id - 0;
    const data = await Users.find();
    const idDB = data.find((val) => {
      return val.id == id;
    })._id;

    const uzgarData = await Users.findByIdAndUpdate(idDB, body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: uzgarData,
    });
  } catch (er) {
    res.status(404).json({
      status: "fail",
      data: "",
    });
  }
};
const deleteuser = async (req, res) => {
  try {
    const id = +req.params.id;
    const data = await Users.find();
    const idDB = data.find((val) => {
      return val.id == id;
    })._id;
    const deleteUser = await Users.findByIdAndDelete(idDB);
    res.status(200).json({
      status: "Succes",
      data: deleteUser,
    });
  } catch (er) {
    res.status(404).json({
      status: "fail",
      data: "delete not",
    });
  }
};
module.exports = { getUser, postUser, patchUser, deleteuser };
