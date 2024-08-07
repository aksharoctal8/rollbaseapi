const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const admionimgpath = "/upload";
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
    adminimage:{
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
    mangerids:{
        type:Array,
        ref:'Manager'
    }
})

const AdminImageStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname,"..",admionimgpath))
    },
    filename: (req, file, cb) => {
        cb(null,file.fieldname+"-"+Date.now())
    }
})

RegisterScema.statics.uploadimage = multer({storage:AdminImageStorage}).single('adminimage');
RegisterScema.statics.imgpath = admionimgpath;
const Admin = mongoose.model('Admin',RegisterScema);
module.exports = Admin;