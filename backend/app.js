/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */





var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '3ebbed79816642c5a13ef9a9e938ed02'; // Your client id
var client_secret = '4626626f4b104bd68b30c7df1bebea13'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
var caccess_token = ""
var profileID = ""

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';

var app = express();
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

app.get('/login', function (req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = `
    ugc-image-upload,
    user-read-playback-state,
    user-modify-playback-state,
    user-read-currently-playing,
    app-remote-control,
    playlist-read-private,
    playlist-read-collaborative,
    playlist-modify-private,
    playlist-modify-public,
    user-follow-modify,
    user-follow-read,
    user-read-playback-position,
    user-top-read,
    user-read-recently-played,
    user-library-modify,
    user-library-read,
    user-read-email,
    user-read-private
  `;
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

function getToken() {
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            caccess_token = body.access_token;
            profileID = body.id;
            res.send({
                'access_token': access_token
            });
        }
    });
}

app.get('/callback', function (req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;
                caccess_token = body.access_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    profileID = body.id;
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/filters.html');
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

app.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            caccess_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

// app.get("/getdata", (req, res) => {
//   res.sendFile(__dirname + "/public/filters.html");
// });


// Search Bar basically
app.post('/search', function (req, res) {
    const album = req.body.album;
    const artist = req.body.artist;

    var options = {
        url: `https://api.spotify.com/v1/search?type=album&q=${album}&limit=1`,
        headers: { 'Authorization': 'Bearer ' + caccess_token },
        json: true
    };

    // use the access token to access the Spotify Web API
    request.get(options, function (error, response, body) {
        // res.send(body);
        var albums = body.albums.items[0];
        var artist = albums.artists[0].name;
        var album_name = albums.name;
        var release_date = albums.release_date;
        var img_src = albums.images[0].url;
        res.send(
            `<h1>You found ${album_name} by ${artist}.</h1>
      <h2>This album was released on ${release_date}.</h2>
      <img src=${img_src} />`
        )

    });

})

app.post('/getTopSongs', function (req, res) {
    // Options for getting your Top 5 artists.
    var options = {
        url: `https://api.spotify.com/v1/me/top/tracks?limit=10`,
        headers: { 'Authorization': 'Bearer ' + caccess_token },
        json: true
    };

    // Get request for Top 5 songs.
    request.get(options, function (error, response, body) {
        // res.send(body);
        var result = "";
        for (var i = 0; i < 10; i++) {
            var item = body.items[i];
            var artist = item.artists[0].name;
            var img_src = item.album.images[0].url;
            var release_date = item.album.release_date;
            var song_name = item.name;
            result += `<h1>${song_name} by ${artist}.</h1>
                <h2>This song was released on ${release_date}.</h2>
                <img src=${img_src} />`
        }

        res.send(result);

    });


})

console.log('Listening on 8888');
app.listen(8888);
