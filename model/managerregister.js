const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const managerimgpath = "/upload/Manager";
const RegisterScema = mongoose.Schema({
    username :{
        type:String,
        required :true
    },
    email:{
        type:String,
        required :true
    },
    password:{
        type:String,
        required :true
    },
    number:{
        type:String,
        required:true
    },
    managerimage:{
        type:String,
        required:true
    },
    Create_Date:{
        type:String,
        required:true
    },
    Upadate_Date:{
        type:String,  
        required:true  
    },
    adminids:{
        type:Array,
        ref:'Admin'
    }
})

const ManagerImageStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname,"..",managerimgpath))
    },
    filename: (req, file, cb) => {
        cb(null,file.fieldname+"-"+Date.now())
    }
})

RegisterScema.statics.uploadimage = multer({storage:ManagerImageStorage}).single('managerimage');
RegisterScema.statics.imgpath = managerimgpath;
const Manager = mongoose.model('Manager',RegisterScema);
module.exports = Manager;