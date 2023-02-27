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
  const { page = 1, gender, age } = req.query;
  let obj = {};
  if (gender) {
    obj.gender = gender;
  }
  const userdata = await User.find(obj).limit(10).skip((page - 1) * 10)
  const count = await User.find(obj).count()
  console.log(count)
 return res.status(200).send({userdata,count})

})


// // User Login at url (http://localhost:8080/users/login)
// Router.post("/login", async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     //Check if any input field is empty
//     if (!email || !password) {
//       return res.status(404).send({msg : "Opps! Fill The all input field"});
//     }
//     let isEmail = await User.findOne({ email });
//     //Check if the email exists
//     if (!isEmail) {
//       return res.status(404).send({msg : "Opps! You have to login first!"});
//     }
//     //Check if password is wrong
//     if (isEmail.password !== password) {
//      return res.status(404).send({msg : "Opps! please enter right credintial"});
//     }
//     let token = `${isEmail._id}:${isEmail.role}`;

//     res.cookie("next-food", token);
//     // if all criteria are pass then send the token
//    return res.status(200).send({msg : "Successfully Login", token: `${isEmail._id}:${isEmail.role}` });
//   } catch (error) {
//    return res.status(500).send({ msg: "Something Went Wrong!" });
//   }
// });

// // Get all the user to the admin page at url (http://localhost:8080/users/allUser)
// Router.get("/allUser", async (req, res) => {
//   let { limit = 5, page = 1 } = req.query;
//   try {
//     let allUses = await User.find()
//       .limit(limit)
//       .skip((page - 1) * limit);
//     if (allUses) {
//       return  res.status(200).send(allUses);
//     }
//   } catch (error) {
//     return res.status(500).send({ msg: "Something Went Wrong!" });
//   }
// });

// // Delete user (http://localhost:8080/users/delete/:id)
// Router.delete("/delete/:id", async (req, res) => {
//   try {
//     let id = req.params.id;
//     let isUser = await User.findOne({ _id: id });
//     // let user = await User.find();
    

//     if (isUser) {
//       let deleteUser = await User.findByIdAndDelete(id, { new: true });
//       let user = await User.find();
//       return res.status(200).send(user);
 
//     } else {
//       res.status(404).send({msg : "User Not Exists!"});
//     }
//   } catch (error) {
//     return res.status(500).send({ msg: "Something Went Wrong!" });
//   }
// });

module.exports = Router;
