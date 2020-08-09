const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const authentication = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////setting up session////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

app.use(session({
	key:"user_sid",
	secret:"somerandomstuff",
	resave: false,
	saveUninitialized: false,
    cookie: {
		expires: 600000,
    }
}));



app.use(cookieParser());

app.use(function(req, res, next) {
	if (req.cookies.user_sid && !req.session.user) {
		res.clearCookie("user_sid");
	};

	next();
});


app.use(function(req, res, next){
	if(!req.cookies.lang){
		req.cookies.lang="FA";
		req.cookies.theme="light"
		res.cookie("lang","FA")
		res.cookie('theme',"light" );
	}
	
	next();
});

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////view engine setup/////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////data base setup///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

// handle mongoose collection.ensureIndex warn
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/article-final-project', {
useNewUrlParser: true,
useUnifiedTopology: true
});




///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////end points and midlles wares/////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authentication);
app.use('/users', usersRouter);



// module.exports = app;
app.listen(3000,function(){
console.log('up and running on 3000');
})
