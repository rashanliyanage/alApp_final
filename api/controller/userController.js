var User = require('../model/userModel');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

function saveUser(req, hash, verificationCode) {
    console.log("save user")
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        isVerified: false,
        verificationCode: verificationCode,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        city: req.body.city,
        stream: req.body.stream,
        contactNumber: req.body.contactNumber,
        role: req.body.role
    });
    console.log(user)
    return user.save();
}

var getStudentByDistric = function (serchkey, callback) {
    console.log(serchkey);
    User.find({ city: serchkey })
        .exec()
        .then(students => {
            callback(null, students);
        }).catch(err => {
            callback(err, null);
        });
}

var getStudentWithoutDisctric = function (callback) {

    User.find()
        .exec()
        .then(students => {
            callback(null, students);

        }).catch(err => {
            callback(err, null);
        });

}


var getTeacher = function () {
    User.find({ city: serchkey, role: "teacher" })
        .exec()
        .then(function (err, teachers) {


        })
        .catch(err => {
            res.status(500).json({
                state: false
            })
        });


}

module.exports.getUserById = function (id, callback) {
    UserModel.findOne(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    console.log(username + 'fjfklsfk');
    const query = { userName: username }
    UserModel.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}


// module.exports.userRegister =userRegister;
module.exports.getStudentByDistric = getStudentByDistric;
module.exports.getStudentWithoutDisctric = getStudentWithoutDisctric;

module.exports = {
    saveUser: saveUser
}