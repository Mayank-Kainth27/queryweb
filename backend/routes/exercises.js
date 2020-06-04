const router = require('express').Router();
const user = require('../models/user_model');
const Exercise = require('../models/exercise_model');
const Subject = require('../models/subject_model');

router.route('/queslist').get((req, res) => {
    user.findOne({ _id: req.user })
        .then(exercise => {
            Exercise.find({})
                .then(docs => {
                    res.json(docs);
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => res.status(400).json('Error : ' + err));
})


router.route('/addques').post((req, res) => {
    const subjectName = req.body.subjectName;
    const question = req.body.question;

    const newExercise = new Exercise({
        subjectName,
        question
    });
    newExercise.save()
        .then((response) => {
            user.updateOne({ _id: req.user }, { $push: { ques: response._id } })
                .then(u => {
                    res.send('Question Submitted !!')
                })
        })
        .catch(err => res.status(400).json('Error : ' + err))
})

router.route('/answer2/:id').post((req, res) => {
    Exercise.updateOne({ _id: req.params.id }, { $push: { answer: req.body.answer } })
        .then(() => {
            res.json('Answered ..... !')
        })
        .catch((err) => res.send('Error Occured' + err))

    user.find({ _id: req.user, ans: req.params.id })
        .then(data => {
            //console.log(data)
            if (data.length == 0) {
                user.updateOne({ _id: req.user }, { $push: { ans: req.params.id } })
                    .then(data => {

                        res.send(data);
                    })
                    .catch(err => res.send(err))
            }
        })
        .catch(err => { res.send(err) })
})

router.route('/allAnswer/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            res.json(exercise)
        })
        .catch(err => res.status(400).json(err))
})

router.route('/myques').get((req, res) => {
    user.findOne({ _id: req.user })
        .then(exercise => {

            Exercise.find({ _id: { $in: exercise.ques } })
                .then(docs => {
                    res.send(docs);
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/myans').get((req, res) => {
    user.findOne({ _id: req.user })
        .then(exercise => {

            Exercise.find({ _id: { $in: exercise.ans } })
                .then(docs => {
                    res.send(docs);
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => res.status(400).json('Error: ' + err));
})



module.exports = router;