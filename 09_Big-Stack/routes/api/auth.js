const express = require("express")
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/myurl")

//@type     GET
//@route    /api/auth
//@desc     just for testing
//@access   PUBLIC
router.get('/', (req,res) => {
    res.json({
        test: "auth"
    })
})

//Import Schema for Person to register
const Person = require("../../models/Person")

//@type     POST
//@route    /api/auth/register
//@desc     route for registration of user
//@access   PUBLIC
router.post('/register', (req,res) => {
    Person.findOne({ email: req.body.email })
        .then(data => {
            if(data){
                return res.status(400).json({
                    "emailerror": "Email already exists"
                })
            }else{
                const newPerson = new Person({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                //Encrypt password using bcrypt 
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPerson.password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        if(err){
                            throw err;
                        //    console.log(err)
                        }
                        newPerson.password = hash;
                        newPerson.save()
                            .then((person) => {
                                res.json(person) 
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    });
                });
            }
        })
        .catch(err => {
            console.log(err)
        })
})

//@type     POST
//@route    /api/auth/login
//@desc     route for login of user
//@access   PUBLIC
router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    Person.findOne({ email })
        .then(person => {
            if(!person){
                return res.status(404).json({
                    error: "User email not found"
                })
            }   
            //check the password
            bcrypt.compare(password, person.password)
                .then((success) => {
                    // success === true
                    if(success === true){
                        // res.json({
                        //     success: "Login successfully"
                        // })
                        //use payload and create token
                        const payload = {
                            id: person.id,
                            name: person.name,
                            email: person.email
                        };
                        jwt.sign(
                            payload,
                            key.secret,
                            { expiresIn: 3600},
                            (err, token) => {
                                if(err){
                                    console.log(err)
                                }
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            }
                        )
                    }else{
                        res.status(400).json({
                            error: "Incorrect password"
                        })
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
})

//@type     GET
//@route    /api/auth/profile
//@desc     route for profile of user
//@access   PRIVATE
router.get('/profile', passport.authenticate('jwt', { session : false}), (req, res) => {
    // console.log(req.user);
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        profilepic: req.user.profilepic
    })
})


module.exports = router;