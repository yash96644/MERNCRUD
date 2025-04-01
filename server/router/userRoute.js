const express = require("express");
const router = express.Router();
const user = require("../models/user");
const mongoose = require("mongoose");



// create user
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;
    try {
      const newAdded = await user.create({
        name: name,
        email: email,
        age: age,
      });
      res.status(200).json({ message: "user created successfully" });
    } catch (err) {
      res.status(500).json({ message: "error creating user" });
    }
  });
  

  //find all users 
  router.get("/", async (req, res) => {
     try{
      const users = await user.find();
      res.status(200).json(users);
     } catch(err){
      res.status(500).json({ message: "error fetching users" });
     }
  });
   

  // get single user
  router.get("/", async (req, res) => {
    const {id} = req.params;
    try{
     const singleUser = await user.findById({_id : id});
     res.status(200).json(singleUser);
    } catch(err){
     res.status(500).json({ message: "error fetching users" });
    }
 });
   
// To delete user 

 router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    try{
     const deleteUser = await user.findByIdAndDelete({_id : id});
     res.status(200).json(deleteUser);
    } catch(err){
     res.status(500).json({ message: "error fetching users" });
    }
 });

// to patch user / put / update user

router.patch("/:id", async (req, res) => {
    const {id} = req.params;
    const {name, email, age} = req.body;
    try{
     const UpdateUser = await user.findByIdAndUpdate(id , req.body,{
        new : true
     });
     res.status(200).json(UpdateUser);
    } catch(err){
     res.status(500).json({ message: "error fetching users" });
    }
 });




  module.exports = router;