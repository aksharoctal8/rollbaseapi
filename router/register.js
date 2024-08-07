const express = require('express');
const router = express.Router();
const admincontroller = require("../controller/admincontroller");
const admin = require("../model/adminregister");
const passport = require('passport')
router.post("/register",admin.uploadimage,admincontroller.register);
router.post("/login",admincontroller.login);
router.get("/adminprofile",passport.authenticate('jwt',{failureRedirect:"/admin/faillogin"}),admincontroller.adminprofile);
// router.get("/adminprofile/:id",admincontroller.adminprofile);
router.patch("/editprofile/:id",admin.uploadimage,passport.authenticate('jwt',{failureRedirect:"/admin/faillogin"}),admincontroller.editprofile)
router.delete("/deleteadmin/:id",passport.authenticate('jwt',{failureRedirect:"/admin/faillogin"}),admincontroller.deleteadmin)
router.get("/faillogin",async(req,res)=>{
    return res.status(400).json({ mes: 'login failed', status: 0 });    
})
router.use("/manager",require("./Managerrouter"))
module.exports = router;