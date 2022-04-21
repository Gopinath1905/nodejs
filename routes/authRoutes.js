const express = require("express");
const authRoutes = express.Router();
const User = require("../models/User");
const {hashGenerate} = require ("../helpers/hashing.js");
const {hashValidator} = require ("../helpers/hashing.js");
const res = require("express/lib/response");
const {tokenGenerator} = require("../helpers/token.js");
const authvarify = require("../helpers/authverify.js");
const authverify = require("../helpers/authverify.js");
const { _ids } = require("@hapi/joi/lib/base");
const {authSchema} = require("../helpers/validation");


authRoutes.post("/signup",async (req,res) =>{
    try{
        const hashpassword = await hashGenerate(req.body.password);
        const result = await authSchema.validateAsync(req.body);
        const user = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            techstack:req.body.techstack,
            email:req.body.email,
            password:hashpassword
        });
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(error){
       res.status(401).send({
        message: error.message || "Invalid Email or Password"
});
    }
});

authRoutes.post("/signin",async (req,res) =>{
    try{
        const existingUser = await User.findOne({email:req.body.email});
        if(!existingUser){
            return res.status(401).json('Email invalid');
        }else{
            const checkUser = await hashValidator(req.body.password,existingUser.password)
            if(!checkUser){
                return res.status(401).json('Password Invaild');
            }else{
                const token = await tokenGenerator(existingUser.email);
                res.cookie("jwt",token);
                res.send(token);
                 
            }

        }
    }catch(error){
        res.send(error);
    }
   
})
authRoutes.get("/protected/:_id",(req,res)=>{
User.findOne({_id:req.params._id})
    .then(coupon => {
        res.send(coupon);
    }).catch(error => {
        res.status(401).send({
            message: error.message || "some error occurred while retrieving coupon details"
        });
    });
    });

module.exports = authRoutes;