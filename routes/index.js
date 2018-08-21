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

// If access token is present, proceed to React app; otherwise go to login page
router.get('/', (req, res) => {
  if (req.session.accessToken) {
    res.redirect('/new-releases');
  } else {
    res.render('login');
  }
});

// Serve the login page, where the user is shown login info before proceeding to Spotify
router.get('/login', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      redirect_uri,
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
    }),
  );
});

// For testing
// router.get('/', (req, res) => {
//   return res.render('app');
// });

// Spotify Oauth login authorization response from redirect_uri
router.get('/callback', (req, res) => {
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
    console.log('entered request post. response = ', response);
    if (err) {
      res.render('error', { err });
    }

    const accessToken = body.access_token; console.log('accessToken: ', accessToken);
    req.session.accessToken = accessToken;
    res.render('app');
  });
});

module.exports = router;
