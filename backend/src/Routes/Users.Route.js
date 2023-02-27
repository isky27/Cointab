const express = require("express");
const Router = express.Router();
const axios = require('axios');
//Import Users Module
const User = require("../Models/Users.model");


Router.get("/fetch", async (req, res) => {
  try {
    const result = await axios.get("https://randomuser.me/api/?results=60");
    const data= await result.data;
    let user = await User.insertMany(data.results)
    return res.status(200).send(user);
  } catch (error) {
    res
      .status(404)
      .send({ msg: "Something Went Wrong!", backendError: error });
  }
  });


Router.delete("/delete",async(req,res)=>{
  try {
    let isUser = await User.findOne();

    if (isUser) {
      let deleteUser = await User.deleteMany({});
      return res.status(200).send({ msg: "All user deleted" });

    } else {
      res.status(404).send({ msg: "User Not Exists!" });
    }
  } catch (error) {
    return res.status(500).send({ msg: "Something Went Wrong!" });
  }
})

Router.get("/api", async (req, res) => {
  const { page = 1, gender } = req.query;
  let obj = {};
  if (gender) {
    obj.gender = gender;
  }
  const userdata = await User.find(obj).limit(10).skip((page - 1) * 10)
  const count = await User.find(obj).count()
  console.log(count)
 return res.status(200).send({userdata,count})

})

module.exports = Router;
