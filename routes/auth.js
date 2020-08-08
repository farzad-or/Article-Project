const express = require('express');
const User = require('../model/user')
const bcrypt = require('bcrypt')
const saltRounds = 13;
const router = express.Router();

/* GET home page. */
router.post('/signup', async function (req, res) {
  try {
    console.log(req.body);
    if (!req.body.userName || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.gender || !req.body.phones) {
      throw new Error('You have an empty input.')
    };
    if (req.body.password.length < 8) {
      throw new Error('password error')
    };
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      phones: req.body.phones,
      gender: req.body.gender
    })

    let user = await newUser.save()
    if (user) {
      res.json(user)
    } else {
      throw new Error("something Wrong")
    }
  } catch (error) {
    res.send(error.message)

  }


});



module.exports = router;