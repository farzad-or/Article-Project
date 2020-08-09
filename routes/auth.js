const express = require('express');
const User = require('../model/user')
const bcrypt = require('bcrypt')
const saltRounds = 13;
const router = express.Router();


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////session check/////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const checkSession = (req, res, next) => {
  if (!req.session.user) {
      res.redirect("/api/signIn");
  }
  next()
}

const checkAdminSession = async (req, res, next) => {
  try {
      let admin = await User.find({ role: "admin" })
      for (let i = 0, n = admin.length; i < n; i++) {

          if (!req.session.user || req.session.user._id != admin[i]._id) {
              console.log("omad");
              return res.redirect("/api/signIn");
          }

      }
  } catch (error) {
      console.log(error);
      return res.status(403).json("forbidden")
  }
  next()

}


router.use('/dashboard',checkSession,  userDashboard);
router.use('/article',checkSession,  articleRouter);
router.use('/admin', checkAdminSession, admin);



//check is log in before or not
const isLogin = (req, res, next) => {
  if (req.session.user) {
      res.redirect('/api/dashboard')
  }
  next()
}


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////setting up sign up requests///////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////











///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// setting up sign in requests ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

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




///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////setting up log out requests///////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////






///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////setting up log out requests///////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// forget password end point ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// search end point ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// search end point ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// change language end point //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
