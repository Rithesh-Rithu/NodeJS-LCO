const express = require("express");
const app = express();

const port = 3000;
const hostname = '127.0.0.1';

app.get("/", (req, res) => {
    res.send("Hello World!!!")
});

app.get("/about-us", (req, res) => {
    res.send("About us")
});

app.get("/ab*cd", (req, res) => {
    res.send("<h1>I am a regex page</h1>")
});

app.get("/user/:id/status/:status_id", (req, res) => {
    res.send(req.params)
});

app.get("/flights/:from-:to", (req, res) => {
    res.send(req.params)
});

app.get("/json", (req, res) => {
    res
    .status(200)
    .json({
        name: "rithesh",
        age: "20"
    })
});

app.get("/error", (req, res) => {
    res
    .status(500)
    .json({
        error: "Something went wrong",
    })
})



app.post("/login", (req,res) => {
    res.send("login page ")
})

app.listen(port, hostname, () => {
    console.log(`Server is running at ${hostname}:${port}`)
})



// res.download()
// res.end()
// res.json()
// res.send()
// res.render()
// res.redirect()
// res.status()


// 200 - Ok
// 403 - Forbidden
// 404 - File not found
// 500 -Internal server error 
