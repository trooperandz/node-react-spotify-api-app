/**
 * All /login routes
 */

const express = require('express');
const request = require('request');
const querystring = require('querystring');

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  REDIRECT_URI,
  FRONTEND_URI,
} = require('../lib/constants/login');

const router = express.Router();
const redirect_uri = REDIRECT_URI;

// On /login request, kick off Spotify authorization flow
router.get('/', (req, res) => { console.log('entered /login route')
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      redirect_uri,
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
    }),
  );
});

// Spotify Oauth login authorization response from redirect_uri ('/login/callback')
// Note: this route must be registered with the Spotify api in order to work
router.get('/callback', (req, res) => { console.log('entered /login/callback route')
  const { code } = req.query;

  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri,
      grant_type: 'authorization_code',
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
      ).toString('base64')),
    },
    json: true,
  };

  request.post(authOptions, (err, response, body) => {
    if (err) {
      res.render('error', { err });
    }

    const accessToken = body.access_token;
    console.log('accessToken set in /callback: ', accessToken);
    req.session.accessToken = accessToken;
    req.session.test = 'cool-beans';
    res.render('app');
  });
});

module.exports = router;