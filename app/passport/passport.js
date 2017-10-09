var FacebookStrategy 	= require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User 				= require('../models/user');
var session = require('express-session');

var jwt = require('jsonwebtoken');
var secret = "Test Secret!"


/*
	##** IMPORTANT **##
	- REMEMBER TO SWICH THE callbackURL before deplying.
*/

module.exports = function(app, passport) {

	app.use(passport.initialize());
	app.use(passport.session());
	app.use(session({
	  secret: 'keyboard cat',
	  resave: false,
	  saveUninitialized: true,
	  cookie: { secure: false }
	}));

	passport.serializeUser(function(user, done) {
		token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h'});
	  	done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  	User.findById(id, function(err, user) {
	    	done(err, user);
	  	});
	});

	passport.use(new FacebookStrategy({
    clientID: '200724793800844',
    clientSecret: '2e484e804ab2f60dd1db8410cb1f21b4',
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email', 'profileUrl']
  	},
	  	function(accessToken, refreshToken, profile, done) {
	  		console.log(profile)
	    	User.findOne({ email: profile._json.email }).select('username, password, email').exec(function(err, user) {
	    		if(err) done(err);

	    		if(user && user != null) {
	    			done(null, user);
	    		} else {
	    			done();
	    		}
	    	})
		}
	));



	passport.use(new GoogleStrategy({
	    clientID: "692774161074-gs9t8k2dpp3o7a8u0dupnqvf2fqvhn1h.apps.googleusercontent.com",
	    clientSecret: "VhV8iQ5_84jElMFVo8fPJ24t",
	    callbackURL: "http://localhost:8080/auth/google/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {
	       console.log(profile.emails[0].value)

	       User.findOne({ email: profile.emails[0].value}).select('username password email').exec(function(err, user) {
	    		if(err) done(err);

	    		if(user && user != null) {
	    			done(null, user);
	    			console.log('*** ALl GOOD ***')
	    		} else {
	    			console.log('there was a problem')
	    			done();
	    		}
	    	})
	  }
	));

	app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'] }));


	app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/googleerror' }), function(req, res) {
	    console.log('#### WE aRe HERE #####')
	    res.redirect('/google' + token);
	});

	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
		res.redirect('/facebook/' + token);
	});
	
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }) );

	return passport;
}