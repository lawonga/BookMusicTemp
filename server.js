/**
 * Created by tal on 8/28/16.
 */

var express = require('express');
var app = express();

var getAuthLink = require('./getAuthLink.js');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/login', function(req, res) {
    res.redirect(getAuthLink());
});

app.get('/callback', function(req, res) {
    res.send("Login successful");

});

var server = app.listen(8888, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});