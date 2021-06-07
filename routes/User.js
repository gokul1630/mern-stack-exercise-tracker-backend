const router = require('express').Router();
const UserSchema = require('../model/UserSchema');

router.route('/').get((res) => {
  UserSchema.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Err:' + err));
});

router.route('/add').post((req, res) => {
  const user = req.body.user;
  const userSchema = new UserSchema({ user: user });

  userSchema
    .save()
    .then(() => res.send('user added'))
    .catch((err) => res.status(400).json('Err:' + err));
});

module.exports = router;
