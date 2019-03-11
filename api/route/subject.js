var express = require('express');
var router = express.Router();
var Subject = require('../model/subjectModel');
var subjectController = require('../controller/subjectController');

router.post('/add-subject', function (req,res) {
    console.log('add subject');

    var subjectName = req.body.subjectName;
    var displayName = req.body.displayName;

    subjectController.addSubject(subjectName, displayName, function (err, subject) {

        if (err) {
            throw err;
        } else {
            res.status(200).send({
                success: true,
                subject: subject,
                msg: 'success add subject'
            });
        }
    });
});



router.post('/add-topic', function (req,res) {
    console.log('add new topic');
    const subjectName = req.body.subjectName;
    const topic = {
        number:req.body.number,
        name:req.body.name,
        displayName:req.body.displayName
    }
    subjectController.addTopic(topic, subjectName, function (err, topic) {

        if (err) {
            res.status(500).send({
                success: false
            })
        } else {
            res.status(200).send({
                success: true,
                Topic: topic,
                msg: 'success add new topic'
            });
        }
    });
});

router.get('/get-subjects', function (req, res) {
    subjectController.getSubject(res);
});


module.exports = router;
