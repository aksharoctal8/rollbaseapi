const express = require('express');
const router = express.Router();
const admincontroller = require("../controller/admincontroller");
const admin = require("../model/adminregister")
router.post("/register",admin.uploadimage,admincontroller.register)
module.exports = router;