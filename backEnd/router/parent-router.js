const express = require("express");
const bcrypt = require("bcrypt")
const route = express.Router();
const { sequelize, DataTypes } = require('./../models'); 
const md = require ("./../models/"); 
const parent = require("../models/parent");
const jwt = require("jsonwebtoken")


const Parent = md.Parent; 
console.log(Parent,"parent");


const privateKey = "1015@sdggsds999sds}%%%%%";

verifyToken=(req,res,next)=>{
  const token = req.headers.authorization
  if(!token){
    res.status(400).json({msg:"access rejected.....!!!!!"})
  }

try {
  jwt.verify(token,privateKey)
  next()
}catch(err){
  res.status(400).json({msg:err})
}
  
}


route.post("/register" , async (req, res) => {
  try {
    const { Parent } = md; 

    const existParent = await Parent.findOne({ where: { email: req.body.email } });
    if (existParent) {
      return res.status(400).json({ error: "This email is already in use." });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    

    const newParent = await Parent.create({
      userName: req.body.userName,
      Date_Of_birthday: req.body.Date_Of_birthday,
      phone_Number:req.body.phone_Number,
      email:req.body.email,
      password: hashPassword,

    });
    

    res.status(201).send("success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create an account" });
  }
})


route.post("/login" ,  async (req, res) => {
  try {
    const privateKey = "1015@sdggsds999sds}%%%%%";
    const exist = await Parent.findOne({ where: { email: req.body.email } });

    if (!exist) {
      return res.status(400).json({ error: " email doesn't exist" });
    } else {
      const comparing = await bcrypt.compare(req.body.password, exist.password);

      if (comparing) {
        const token = jwt.sign(
          { id: exist.id, userName: exist.userName},
          privateKey,
          { expiresIn: "9999999012005120h" }
        );

        return res.status(200).json({userName: exist.userName , token}); 
      } else {
        return res.status(401).json({ error: "Invalid email or password" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});



route.get("/getOne/:id", verifyToken ,  (req, res) => {
  Parent.findOne({ where: { id: req.params.id }},{includes : [Parent.id]})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

route.get("/getAll", verifyToken , (req, res) => {
  Parent.findAll({includes:req.body.authorization})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

route.put("/updateOne/:id", verifyToken ,  (req, res) => {
  Parent.update(req.body, { where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

route.delete("/deleteOne/:id", verifyToken , (req, res) => {
  Parent.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = route;
