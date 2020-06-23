const express = require("express");
const app = express();

const port = 3000;
const hostname = '127.0.0.1';

var myconsolelog = function(req, res, next){
    console.log("I am a MIDDLEWARE");
    next();
};

var servertime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
}


// app.use(myconsolelog);
app.use(servertime);

app.get("/", (req, res) => {
    res.send("Hello World!!!" + "and time is: " + req.requestTime)
    console.log("Hello world from /")
});

app.listen(port, hostname, () => {
    console.log(`Server is running at ${hostname}:${port}`)
})



