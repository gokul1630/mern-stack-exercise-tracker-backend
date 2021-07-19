require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const UserSchema = require('../model/UserSchema');

let refreshToken = [];

const authToken = process.env.TOKEN;

router.route('/').get((req, res) => {
  const header = req.headers.authorization;
  let token = header && header.split(' ')[1];
  if (token == null) return res.json({ token: null });
  if (!refreshToken.includes(token)) return res.sendStatus(401);
  jwt.verify(token, authToken, (err) => {
    console.log(err);
    if (err) res.sendStatus(403);
    UserSchema.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json('Err:' + err));

  })
}),

router.route('/add').post((req, res) => {
  const user = req.body.user;
  const userSchema = new UserSchema({ user: user });

  let token = generateToken(userSchema);
  refreshToken.push(token);
  userSchema
    .save()
    .then(() => res.json({ token: token }))
    .catch((err) => res.status(400).json('Err:' + err));
})

function generateToken(user) {
  return jwt.sign({ user }, authToken,{expiresIn:'10s'});
}

module.exports = router;
