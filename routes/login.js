const express = require('express');
const request = require('request')
const querystring = require('querystring')
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  REDIRECT_URI,
  FRONTEND_URI,
} = require('../lib/constants/login');

const router = express.Router();


/* GET spotify Oauth login authorization */
router.get('/', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri: REDIRECT_URI,
    })
  );
});

router.get('/', (req, res) => {
  return res.render('app');
});

/* GET spotify Oauth login authorization response */
router.get('/callback', (req, res) => {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = FRONTEND_URI
    res.redirect(uri + '?access_token=' + access_token)
  });
});

module.exports = router;
