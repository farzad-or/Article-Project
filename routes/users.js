const express = require('express');
const router = express.Router();
const { renderSync } = require('node-sass');
const Article = require("../models/article");
const articleRouter = require("./article");
const multer = require('multer');
const User = require("../models/blogger");
const Response = require("../tools/response")


router.use("/article", articleRouter)

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// get dashboard end points /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// get dashboard end points /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////







///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////// multer package usage and apload avatar end point //////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        let fileType = file.originalname.split(".");// this is file type name
        cb(null, new Buffer.from(req.session.user.userName).toString('base64') + ".png")
    }
})

const uploadAvatar = multer({ storage: storage });


router.post('/uploadAvatar', async (req, res) => {

    try {

        const upload = uploadAvatar.single('avatar');

        upload(req, res, async function (err) {
            if (err) return res.status(400).send('something went wrong.please try again later');

           let user= await User.findByIdAndUpdate(req.session.user._id, { avatar: req.file.filename }, { new: true })

                if (!user) throw new Error('something went wrong.please try again later');

                req.session.user.avatar = req.file.filename;
                res.status(201).send(new Response(true, "updated", Date.now));
            


        })

    } catch (error) {
        console.log(error.message);
        res.json(new Response(false, error.message, Date.now))
    }

})


///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// user information update end point ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////




module.exports = router;
