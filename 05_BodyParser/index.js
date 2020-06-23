const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use("/login", express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    res.send("Hello, my app");
})

app.post("/login", (req, res) => {
    console.log(req.body);
    //do some database process
    res.redirect("/")
})

app.listen(3000, () => {
    console.log("server is running at port 3000...");
})