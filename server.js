const express 			= require('express');
const app 				= express();
let port 				= process.env.PORT || 8080;
const morgan 			= require('morgan');
const mongo 			= require('mongodb');
const mongoose 			= require('mongoose');
const bodyParser 		= require('body-parser');
const expressValidator 	= require('express-validator');
const path 				= require('path');
const passport 			= require('passport');
const social			= require('./app/passport/passport')(app, passport);

let router = express.Router();
let appRoutes = require('./app/routes/api')(router);

app.use(morgan('dev'));
// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// express validator
app.use(expressValidator())
// defining the static folder of the front end.
app.use(express.static(__dirname + '/public'));
// Express Router
app.use('/api', appRoutes);

mongoose.connect('mongodb://ahmed:123456@ds129144.mlab.com:29144/testing-firewood-database', function(err) {
    if(err) {
        console.log('Not Connected To DB.' + err)
    } else {
        console.log('Successfully conected to MongoDB.')
    }
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname +'/public/app/views/index.html'))
})

app.listen(port, function() {
    console.log('Server is runing on ' + port)
});