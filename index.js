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
app.use(express.urlencoded());
app.use("/admin", require("./router/register"))
app.listen(port, (err) => {
    if (err) {
        console.log("server error", err);
    } else {
        console.log("server runing in port", port);
    }
})