const express = require('express');
const router = express.Router();
const managerControler = require("../controller/managerControler");
const manager = require("../model/managerregister");
const admin = require("../model/adminregister")
const passport = require('passport')
router.post("/register",passport.authenticate('jwt',{failureRedirect:"/admin/manager/faillogin"}),manager.uploadimage,managerControler.register);
router.get("/faillogin",async(req,res)=>{
    return res.status(400).json({ mes: 'login failed', status: 0 });
})
module.exports = router;