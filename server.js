/**
 * Created by tal on 8/28/16.
 */

var express = require('express');
var app = express();
var SpotifyWebApi = require('spotify-web-api-node');
var getAuthLink = require('./getAuthLink.js');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/login', function(req, res) {
    res.redirect(getAuthLink());
});

app.get('/callback', function(req, res) {
    var token;
    var expiration;
    var state;
    var obj;

    res.send("Login successful");

    state = req.query.state;

    var spotifyApi = new SpotifyWebApi({
        clientId : '5c352b51039646128c2b9ab2c19a17e5',
        clientSecret : '778a0cb111a14129a2f3d4e5e6af18b1'
    });

    spotifyApi.clientCredentialsGrant()
        .then(function(data) {
            expiration = data.body['expires_in'];
            token = data.body['access_token'];

            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);

            console.log("Requesting playlist...");
            spotifyApi.getPlaylist('thelinmichael', '5ieJqeLJjjI8iJWaxeBLuK')
                .then(function(data) {

                    //console.log("Request Back");
                    //console.log('Some information about this playlist', data.body);
                    obj = data.body.tracks.items;

                    //console.log(obj);

                    //var URIs = [];
                    var ids = [];

                    obj.forEach(function(item) {
                        //var parts = item.track.uri.split(':'); // Splits uri into parts
                        //URIs.push(parts[2]); // Takes the final part of (example): spotify:track:3t343ArThcwgLwNEnabI2I

                        ids.push(item.track.id);
                    });


                    //for(var key in obj) {
                    //    console.log(key);
                    //    URIs.push(obj[key].track.uri);
                    //}
                    //
                    console.log(ids);
                    console.log("\n");
                    //console.log("Done");

                    spotifyApi.getAudioFeaturesForTrack(URIs[3])
                        .then(function(data) {

                            console.log(data.body);
                        }, function(err) {
                            console.error("Something went wrong:");
                            console.error(err);
                        });
                }, function(err) {
                    console.log('Something went wrong!', err);
                });




        }, function(err) {
            console.log('Something went wrong when retrieving an access token', err.message);
        });
});


app.get('/fetch', function(req, res) {

    var spotifyApi = new SpotifyWebApi();


    spotifyApi.getPlaylist('thelinmichael', '5ieJqeLJjjI8iJWaxeBLuK')
        .then(function(data) {
            console.log('Some information about this playlist', data.body);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
});

var server = app.listen(8888, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});