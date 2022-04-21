const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");
Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    techstack:{
        type:String,
        required:true  
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model("User",UserSchema);