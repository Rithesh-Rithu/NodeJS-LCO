const express = require("express");
const mongoose =require("mongoose")

const bodyParser =require("body-parser");
const passport = require("passport")

//bring all routes
const auth = require("./routes/api/auth")
const questions = require("./routes/api/questions")
const profile = require("./routes/api/profile")


const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//mongoDB configuration
const db = require("./setup/myurl").mongoURL

//connect to db
mongoose
    .connect(db,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  })
    .then(() => {
        console.log("MongoDB connected successfully")
    })
    .catch(err => {
        console.log(err)
    })

//passport middleware
app.use(passport.initialize())

//config for JWT strategy
require("./strategies/jsonwtStrategy")(passport)

//test route
app.get('/', (req,res) => {
    res.send("Big stack")
})

//actual routes
app.use('/api/auth', auth)
app.use('/api/questions', questions)
app.use('/api/profile', profile)


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})