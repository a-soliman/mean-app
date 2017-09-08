let User = require('../models/user');

module.exports = function(router){
	router.post('/users', function(req, res) {
    
	    /* GET THE SUBMITTED FIELDS */
	    let username = req.body.username;
	    let password = req.body.password;
	    let email = req.body.email;

	    /* VALIDATE THE SUBMITTED DATA, PROVIDING CUSTOM ERROR MESAGGE FOR EACH */
	    req.checkBody('username', 'username is required!').notEmpty();
	    req.checkBody('password', 'Password is required!').notEmpty();
	    req.checkBody('email', 'Email is required').notEmpty();
	    req.checkBody('email', 'Please provide a valid Email').isEmail();

	    /* 
	    A. CHECK IF ANY OF THE SUBMITED FILDS DOES CAUSE AN ERROR 
	    B. IF POSITIVE: ADD ALL THE ERROR MEASSGES TO AN ARRAY AND SEND TO THE USER.
	    C. ELSE : CREATE A NEW USER USING THE SUBMITTED DATA AND SEND TO THE DATABASE
	    D. IF THE DATABASE RETURNED AN ERROR : NOTIFY THE USER THAT HE/SHE IS ALREADY SUBMITED BEFORE.
	    E. ELSE : NOTIFY THE USER OF THE REQUST STATUS "SUCCESS".
	    */

	    // A.
	    let errors = req.validationErrors();

	    // B.
	    if(errors) {
	        let errorMsgs = [];

	        for(let i =0; i < errors.length; i++) {
	            errorMsgs.push(errors[i].msg);
	        }

	        res.send({ "success": false, "messages": errorMsgs });

	    // C.
	    } else {

	        let user = new User();

	        user.username = username;
	        user.password = password;
	        user.email = email;

	        user.save(function(err) {
	            // D.
	            if(err){
	                res.send({ "success": false, "message": 'Username or Email already exists!' });
	            // E.
	            } else {
	                res.send({ "success": true, "message": "user created" });
	            }
	        });   
	    }   
	});

	return router;
}
