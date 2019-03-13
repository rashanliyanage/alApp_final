var User = require('../model/userModel');
var bcrypt = require('bcrypt-nodejs');
var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();
var config = require('../../config/dbconfig');

var userController = require('../controller/userController');
var emailController = require('../controller/emailController');
var testemail = require('../controller/testemail');

var auth = require('../middlewares/auth-guard');

//user registration
router.post('/register', (req, res, next) => {
    console.log(req.body);
    var verificationCode = emailController.generateRandomNumber()
    User
        .find({ email: req.body.email })
        .exec()
        .then(user => {  
            if(user.length >= 1){
                if(user[0].isVerified == false){
                    res.status(200).json({
                        state: 3,
                        msg: "User Exist, Not verified"
                    })
                } else{
                    console.log('user exist');
                    return res.status(409).json({
                        state: 4, 
                        exist: true
                    });
                }
            } else { 
                console.log("else block")
                bcrypt.genSalt(10, function(salt) {
                    bcrypt.hash(req.body.password, salt, null, function(err, hash) {
                        console.log(hash)
                        if(err){
                            return res.status(500).json({   
                                state: 5   
                            });   
                        }else {
                            userController.saveUser(req, hash, verificationCode)
                                .then(result => {
                                    var receiver = req.body.email;
                                    emailController.sendVerificationCode(receiver, verificationCode)
                                    console.log("User signed up"); 
                                        res.status(201).json({
                                        state: 1,
                                        exist: false, 
                                        code: verificationCode 
                                    });
                                })
                                .catch(err => {
                                    console.log(err);  
                                    res.status(500).json({
                                        state: 5,
                                        Message: "Some Validation Errors"
                                    });
                                });
                        }   
                    });
                });  
            }
        })
})

//user verification
router.post('/userVerify', (req, res, next) => {
    var email = req.body.email;
    var code = req.body.code;
    console.log(email);
    console.log(code);
    User
        .find({ email: email })
        .exec()
        .then(user => {
            console.log(user[0].isVerified);
            if(user[0].isVerified == false){
                if(user[0].verificationCode == code){
                    console.log("second if")
                    user[0]
                        .update({ $set: { isVerified: true } })
                        .then(result => {
                            console.log(result);
                            res.status(200).json({
                                state: 1
                            }) 
                        })
                        .catch(err => {
                            res.status(500).json({
                                state: 5
                            })
                        })
                } else{
                    res.status(200).json({
                        state: 6,
                        msg: "Verification Code Incorrect"
                    })
                }
            } else{
                res.status(200).json({
                    state: 7,
                    msg: "User Already Verified"
                }) 
            }    
        })
        .catch(err => {
            res.status(500).json({
                state: 5
            })
        })
})

//resend verification code
router.post('/resendCode', (req, res, next) => {
    var email = req.body.email;
    console.log(email);
    User
        .find({ email: email })
        .exec()
        .then(user => {
            console.log(user)
            if(user.length >= 1){
                if(user[0].isVerified == true){
                    res.status(200).json({
                        state: 8,
                        msg: "User Already Verified"
                    })
                } else{
                    var newCode = emailController.generateRandomNumber();
                    console.log(newCode);
                    emailController.resendVerificationCode(email, newCode);
                    user[0].verificationCode = newCode;
                    user[0]
                        .save()
                        .then(result => { 
                            res.status(200).json({
                                state: 1,
                                newCode: newCode
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(200).json({
                                state: 5
                            })
                        })
                }
            } else{
                console.log("else");
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                state: 5
            })
        })
})

//user login
router.post('/login', (req, res) =>{
    console.log("login")
    User 
        .find({ email: req.body.email })
        .exec()
        .then(user => {
            console.log(user)
            if(user.length < 1){
                return res.status(200).json({
                    state: 2,
                    JWT_Token: null
                });
            } else{
                if(user[0].isVerified == false){
                    res.status(401).json({
                        state: 3,
                        msg: "Not Verified"
                    }) 
                } else{
                    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                        if (result){
                            token = jwt.sign({user: user[0]}, process.env.JWT_KEY, {expiresIn: "10h"}, (err, token) => {
                                if(err){
                                    res.json({ error: err })
                                } else {
                                    return res.status(200).json({
                                        state: 1,
                                        JWT_Token: token 
                                    }) 
                                }
                                console.log('token genetas : '+ this.token);
                            });  
                        }
                        else {
                            console.log(err)
                            return res.status(200).json({
                                state: 5,
                                JWT_Token: null
                            })
                        }
                    });
                }
            }
        })
        .catch(err => { 
            console.log(err);
                res.status(500).json({
                state: 5
            }); 
        });
});

//user edit or update
router.post('/updateProfile', (req, res, next) => {
    console.log("User Update")
    console.log(req.body)
    userEmail = req.body.email;
    User
        .find({ email: userEmail })
        .exec()
        .then(user => {
            if(user.length < 1){
                res.status(404).json({
                    state: 2,
                    msg: "User Not Find"
                })
            } else{
                // console.log(user[0]);
                user[0].isVerified = req.body.isVerified;
                user[0].role = req.body.role;
                user[0].firstName = req.body.firstName;
                user[0].lastName = req.body.lastName;
                user[0].city = req.body.city;
                user[0].contactNumber = req.body.contactNumber;
                user[0].stream = req.body.stream;
                user[0].class = req.body.class;
                // console.log(user[0])
                user[0]
                    .save()
                    .then(result => {  
                        // console.log(result)
                        res.status(200).json({
                            state: 1, 
                            msg: "User Updated"
                        })
                    })
                    .catch(err => {
                        // console.log(err)
                        res.status(500).json({
                            state: 5,
                            msg: "Error on update"
                        })
                    })
            } 
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                state: 5,
                msg: "Error on find"
            })
        })
})

//user delete
/*
When user email receive as req.body.email , 
this route check that email and set isVerified property of user as false
to deny access to system.
*/
router.post('/deleteUser', (req, res, next) => {
    const user = req.body.email;
    User
        .find({ email: user })
        .exec()
        .then(user => {
            if(user.length < 1){
                res.status(404).json({
                    state: 2,
                    msg: "User Not Found"
                })
            } else{
                if(user[0].isVerified == false){
                    res.status(200).json({
                        state: 3,
                        msg: "Not verified, Marked as Deleted"
                    })
                } else{
                    console.log(user);
                    user[0].isVerified = false; 
                    user[0]
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(200).json({
                                state: 1
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                state: 5
                            })
                        })
                }
                
            }
        })
        .catch(err => {
            res.status(500).json({
                state: 5
            })
        })
})

//confirm email
router.post('/emailConfirm', (req, res, next) => {
    var email = req.body.email;
    var code = req.body.code;
    User 
        .find({ email: email })
        .exec()
        .then(user => {
            if(user.length >= 1){
                if((user[0].verificationCode == code) && (user[0].isVerified == true)){
                    res.status(200).json({
                        state: 1
                    })
                } else{
                    res.status(500).json({
                        state: 6
                    })
                }
            } else{
                res.status(500).json({
                    state: 2
                })
            }
        })
})

//reset password
router.post('/resetPassword', (req, res, next) => {
    var email = req.body.email;
    var newPassword = req.body.password;
    User
        .find({ email: email })
        .exec()
        .then(user => {
            if(user.length < 1){
                res.status(500).json({
                    state: 2
                })
            } else{
                bcrypt.genSalt(10, function(salt){
                    bcrypt.hash(newPassword, salt, null, function(err, hash){
                        console.log(hash);
                        if(err){
                            return res.status(500).json({
                                state: 5
                            })
                        } else{
                            user[0].password = hash;
                            user[0]
                                .save()
                                .then(result => {
                                    res.status(200).json({
                                        state: 1
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        state: 5
                                    })
                                })
                        }
                    })
                })
            }
        })
})

//test email send
router.get('/test', (req, res, next) => {
    console.log("test");
    testemail.sendMail()
})

/**
 * created by:Yohan
 * created at:
 * reason:authenticate user
 * 
 * **/
   
router.post('/teacherRegistration', (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.passport;


});

/**
 * created by:Rashan samtih
 * created at:
 * reason:get student for admin panel with search distric
 * 
 * **/

router.get('/get-student/:searchDistric', function (req, res) {
    const serchkey = req.params.searchDistric;
    console.log(serchkey);
    if (!(serchkey == undefined || serchkey == null || serchkey == '')) {
        userController.getStudentByDistric(serchkey, function (err, students) {
            if (err) {
                res.status(500).json({
                    success: false, msg: "failed to geting student"
                });
            } else {
                res.status(200).json({
                    success: true, msg: "success getting students",
                    students: students
                });
            }
        });
    }
});

/**
 * created by:Rashan samtih
 * created at:
 * reason:get student for admin panel
 * 
 * **/

router.get('/get-student', function (req, res) {
    userController.getStudentWithoutDisctric(function (err, students) {
        if (err) {
            res.status(500).json({
                success: false, msg: "failed geting student"
            });
        } else {
            res.status(200).json({
                success: true, msg: "success getting students",
                students: students
            });
        }
    });
});

module.exports = router;