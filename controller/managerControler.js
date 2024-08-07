const Manager = require("../model/managerregister");3
const admin = require("../model/adminregister")
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const JwtaData = require('jsonwebtoken');
const path = require("path");
const fs = require("fs");
module.exports.register = async (req, res) => {
    try {
        let CheckEmail = await Manager.findOne({ email: req.body.email });
        if (CheckEmail) {
            return res.status(400).json({ mes: "Email is alerdy exited" })
        } else {
            var img = '';
            var pass = req.body.password
            if (req.file) {
                img = Manager.imgpath + "/" + req.file.filename;
            }
            req.body.managerimage = img;
            req.body.password = await bcrypt.hash(req.body.password, 10);
            req.body.Create_Date = new Date().toLocaleString();
            req.body.Upadate_Date = new Date().toLocaleString();

            let register = await Manager.create(req.body)
            if (register) {
                let reg  = await admin.findById(req.user.id);
                reg.mangerids.push(register.id);
                await admin.findByIdAndUpdate(req.user.id,reg);
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                        user: "kanabarakshar08@gmail.com",
                        pass: "hewmhckihdtvurqy",
                    },
                });
                const info = await transporter.sendMail({
                    from: 'kanabarakshar08@gmail.com', // sender address
                    to: req.body.email, // list of receivers
                    subject: "email id and password", // Subject line
                    text: "email and password", // plain text body
                    html: `<b>email : ${req.body.email}</b><br><b>password : ${pass}</b>`, // html body
                });
                return res.status(200).json({ mes: 'Record is Insert', status: 1, ad: register });
            } else {
                return res.status(200).json({ mes: 'Record is not instert', status: 0 });
            }

        }
    } catch (error) {
        console.log(error);

        return res.status(400).json({ mes: 'data is not found', status: 0 });
    }
}

// module.exports.login = async(req,res)=>{
//     try {
//         let checkemail = await admin.findOne({email:req.body.email})
//         if (checkemail) {
//             if(await bcrypt.compare(req.body.password,checkemail.password)){
//                 let token = await JwtaData.sign({Admindata:checkemail},'akshar', { expiresIn: '1h' })
//                 return res.status(200).json({ mes: 'Login is success', status: 1, at:token})
//             } else {
//                 return res.status(400).json({mes:"password not match",status:0})
//             }
//         } else {
//             return res.status(400).json({mes:"Invalid Email",status:0})
//         }
        
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({mes:"Login Data Not Found",status:0})
        
//     }
// }


// module.exports.adminprofile = async(req,res)=>{
//     try {
//         // let findadmin = await admin.findById(req.params.id);
//         let findadmin = await admin.findById(req.user._id);
//         if (findadmin) {
//             return res.status(200).json({mes:"Admin Profile",status:1,ap:findadmin})
//         } else {
//             return res.status(400).json({mes:"admin profile not found..",status:0})
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({mes:"Profile Data Not Found",status:0})
//     }
// }
//     module.exports.editprofile = async(req,res)=>{
//         try {
            
         
//             if (req.file) {
//                 let oldImg = await admin.findById(req.params.id);
//                 console.log(oldImg);
//                 // return
//                 if (oldImg.adminimage) {
//                     let fullPath = path.join(__dirname, "..", oldImg.adminimage);
//                     console.log(fullPath);
//                     await fs.unlinkSync(fullPath);
//                 }
//                 var imgPath = '';
//                 imgPath = admin.imgpath + "/" + req.file.filename;
//                 req.body.image = imgPath;
//             }


//             else {
//                 // return
//                 let olddata = await admin.findById(req.params.id);
//                 var imgpath = '';
//                 if (olddata) {
//                     imgpath = olddata.adminimage;
//                 }
//                 req.body.adminimage = imgpath;
//             }
//             let adminupdated = await admin.findByIdAndUpdate(req.params.id, req.body);
//             if (adminupdated) {
//                 let updateprofile = await admin.findById(req.user.id)
//                 return res.status(200).json({ msg: 'Data Updated Succ....', status: 1, rec: updateprofile });
//             }
//             else {
//                 return res.status(400).json({ msg: 'data not Updated..', status: 0 });
//             }
//         } catch (error) {
//             console.log(error);
//             return res.status(400).json({mes:"Profile Data Not Found",status:0})
//         }
//     }
//     module.exports.deleteadmin = async(req,res)=>{
//         try {
//             let olddata = await admin.findById(req.params.id);
//             if (olddata) {
//                 var oldimg = olddata.adminimage;
//                 if (oldimg) {
//                     let fullPath = path.join(__dirname, "..", olddata.adminimage);
                  
//                     // console.log(fullPath);
//                     await fs.unlinkSync(fullPath);
//                     let deletedata = await admin.findByIdAndDelete(req.params.id)
//                     if (deletedata) {
//                         return res.status(200).json({mes:"admin data delete with image",adi : deletedata,status:1})
//                     } else {
//                         return res.status(200).json({mes:"admin data can't delete with image",adi : deletedata,status:1})
//                     } 
//                 } else {
//                     let deleterecord = await admin.findByIdAndDelete(req.params.id)
//                     if (deleterecord) {
//                         return res.status(200).json({mes:"admin data delete",adi : deleterec,status:1})
//                     }else{
//                         return res.status(200).json({mes:"admin data can't delete",status:0})
//                     }
//                 }
//             } else {
//                 return res.status(200).json({mes:"admin data can't delete",status:0})
//             }
//         } catch (error) {
//             console.log(error);
//             return res.status(400).json({mes:"Profile Data Not Found",status:0})
//         }
//     }