const express = require('express')
const port = 8003;
const app = express();
const mongoose = require('mongoose')
mongoose.connect(("mongodb+srv://aksharkoctal8:rbVSTcxkKH3kQYQn@akshar.fxsbbxv.mongodb.net/rollbaseapi"), {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));
const passport = require('passport');
const LocalStrategy = require('./config/passport-stagy');
const session = require('express-session')
// app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    name:'aksharJwtSession',
    secret:'akshar',
    resave: false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*100
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/admin", require("./router/register"))
app.listen(port, (err) => {
    if (err) {
        console.log("server error", err);
    } else {
        console.log("server runing in port", port);
    }
})