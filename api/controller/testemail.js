var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
var path = 'api/templates/register/registerEmail.html';

function sendMail(){
    console.log("email send");
    const sender = 'project.alapp@gmail.com';
    
    var readHTMLFile = function(path, callback) {
    fs.readFile('api/templates/register/registerEmail.html', {encoding: 'utf-8'}, function (err, html) {
        console.log("file read");
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, html);
        }
    });
    };

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'project.alapp@gmail.com',
            pass: 'alapp12345'  
        }
    });

    readHTMLFile(__dirname + 'api/templates/register/registerEmail.html', function(err, html) {
        console.log("read html file"); 
        var template = handlebars.compile(html);
        var replacements = {
            username: "John Doe"
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: sender,
            to : 'dldndasanayaka@gmail.com',
            subject : 'test subject',
            html : htmlToSend
        };
        transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                callback(error, null);
            }
        });
    });
}

module.exports = {
    sendMail: sendMail
}