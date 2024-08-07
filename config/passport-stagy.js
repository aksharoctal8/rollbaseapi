const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const jwtExtract= require('passport-jwt').ExtractJwt;
const Manager = require("../model/managerregister");
const admin = require('../model/adminregister');
var option ={
    jwtFromRequest:jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'akshar'
}
var option2 ={
    jwtFromRequest:jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'Manager'
}
passport.use(new JwtStrategy(option,async(record,done)=>{
    let checkAdmin = await admin.findById(record.Admindata._id);
    if (checkAdmin) {
        return done(null,checkAdmin)
    } else {
        return done(null,false);
    }
}))

passport.serializeUser( (user, done)=> {
    return done(null, user.id);
})
passport.deserializeUser(async  (id, done)=> {
    let recheck = await admin.findById(id);
    if (recheck) {
        return done(null, recheck);
    }
    else {
        return done(null, false);        
    }
})
