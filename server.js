const express = require('express');
const app = express();
let port = process.env.PORT || 8080;
const morgan = require('morgan');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let User = require('./app/models/user');

mongoose.connect('mongodb://ahmed:123456@ds129144.mlab.com:29144/testing-firewood-database', function(err) {
    if(err) {
        console.log('Not Connected To DB.' + err)
    } else {
        console.log('Successfully conected to MongoDB.')
    }
})
app.post('/users', function(req, res) {
    let user = new User();
    
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save();
    res.send('user created')
})

app.listen(port, function() {
    console.log('Server is runing on ' + port)
});