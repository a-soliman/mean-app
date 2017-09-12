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

	/* 
		**************************
		==== USER LOGIN ROUTE ====
	 	**************************
	*/

	router.post('/authenticate', function(req, res) {
		User.findOne({ username: req.body.username }).select('email username password').exec(function(err, user) {
			if(err) throw err;

			if(!user) {
				res.send({"success": false, "message": "Could not authenticate user."})
			} 
			else if(user) {
				let validPassword = null;

				if(req.body.password) {

					validPassword = user.comparePassword(req.body.password);
				
				} else {
					res.send({ "success": false, "message": "Password was not provided"})
				}
				
				if(!validPassword) {
					res.send({ "success": false, "message": "Could not authenticate password!"});
				} else {
					res.send({ "success": true, "message": "User Authenticated!"})
				}
			}
		})
	})

	return router;
}
