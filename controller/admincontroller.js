const admin = require("../model/adminregister");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer")
module.exports.register = async (req, res) => {
    try {
        let CheckEmail = await admin.findOne({ email: req.body.email });
        if (CheckEmail) {
            return res.status(400).json({ mes: "Email is alerdy exited" })
        } else {
            var img = '';
            var pass = req.body.password
            if (req.file) {
                img = admin.imgpath + "/" + req.file.filename;
            }
            req.body.adminimage = img;
            req.body.password = await bcrypt.hash(req.body.password, 10);
            req.body.Create_Date = new Date().toLocaleString();
            req.body.Upadate_Date = new Date().toLocaleString();

            let register = await admin.create(req.body)
            if (register) {
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

        return res.status(400).json({ mes: 'data is notfound', status: 0 });
    }
}