var nodemailer = require('nodemailer');
var crypto = require('crypto');

function sendVerificationCode(receiver, verificationCode) {
    const sender = 'project.alapp@gmail.com';
    const subject = 'Registration';
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'project.alapp@gmail.com',
            pass: 'alapp12345'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: sender,
        to: receiver,
        subject: subject,
        html: '<h1>Welcome</h1><p>Your verification code is </p>' + verificationCode
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('error');
            console.log(error);
            throw new Error('email sending failed');
            
        } else {
            res.status(200).json({
                state: true
            })
        }
    });
}

function generateRandomNumber(req, res, next) {
    const len = 7;
    return crypto 
      .randomBytes(Math.ceil(len / 2))
      .toString('hex')
      .slice(0, len) 
}

module.exports = {
    sendVerificationCode: sendVerificationCode,
    generateRandomNumber: generateRandomNumber
};