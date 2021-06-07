const router = require('express').Router();
const ExerciseSchema = require('../model/ExerciseSchema');

router.route('/').get((res) => {
  ExerciseSchema.find()
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
  const id = req.params.id;
  ExerciseSchema.findById(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json(err));
});

router.route('/').post((req, res) => {
  const user = req.body.user;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;
  const exerciseSchema = new ExerciseSchema({
    user,
    description,
    duration,
    date,
  });
  exerciseSchema
    .save()
    .then(() => res.send('exercise added'))
    .catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:id').patch((req, res) => {
  const id = req.params.id;
  ExerciseSchema.findById(id)
    .then((response) => {
      (response.user = req.body.user),
        (response.description = req.body.description),
        (response.duration = Number(req.body.duration)),
        (response.date = Date.parse(req.body.date));

      response
        .save()
        .then((response) => res.json(response))
        .catch((err) => res.status(400).json('Error:' + err));
    })
    .catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req, res) => {
  const id = req.params.id;
  ExerciseSchema.findByIdAndDelete(id)
    .then(() => res.send('User Deleted'))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
