const Users = require("../Model/userModel");
const enterAcount = async (req, res) => {
  try {
    const body = req.body.data;
    const userData = await Users.find();
    const user = userData.filter((val) => val.data.username == body.username);
    const parol = user.filter((val) => val.data.password == body.password);
    console.log(parol);
    res.status(200).json({
      data: parol,
    });
  } catch (er) {
    const parol = [];
    res.status(404).json({
      data: parol,
    });
  }
};
module.exports = enterAcount;
