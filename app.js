var express = require('express');
var app = express();
var bodyParser =require('body-parser');
var mongoose = require('mongoose');
var db = require('./config/dbconfig');
var cors = require('cors');
var mongoose =require('mongoose');

var subject =require('./api/route/subject');
var questionRoutes =require('./api/route/question');
var userRoutes =require('./api/route/user');

require('dotenv').config()

mongoose.connect(db.dbconnection1, function (err, db) {
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database");
    }    
});

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    ); 
    if(req.method === 'OPTIONS'){ 
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE')
        return res.status(200).json({});
    }
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.send('hello vicerant company......');
});

app.use('/user', userRoutes);
app.use('/admin/subjects', subject);
app.use('/admin/questions',questionRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next)=>{ 
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;