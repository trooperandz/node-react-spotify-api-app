/* Spotify API app middleware */

const request = require('request');

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} = require('../lib/constants/login');

/**
 * Check for spotify token expiration & refresh if necessary
 */
async function refreshExpiredToken(req, res, next) {
  const { expiresIn, originalAuthTimestamp } = req.session;
  const currentTime = Date.now();

  if (!expiresIn) {
    console.log('There is no active expiresIn session var!');
  }

  if (!originalAuthTimestamp) {
    console.log('There is no active originalAuthTimestamp session var!');
  }

  const secondsElapsed = (currentTime - originalAuthTimestamp) / 1000;

  if ((!expiresIn || !originalAuthTimestamp) || (secondsElapsed > expiresIn)) {
    await requestRefreshToken(req);
    return next();
  }

  console.log('No need to request a refresh token...');
  return next();
}

/**
 * Execute the expired authorization token request and save the new access token session
 */
function requestRefreshToken(req) {
  const { refreshToken } = req.session;
  console.log('Requesting refresh token...');

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
      ).toString('base64')),
    },
    json: true,
  };

  return new Promise((resolve, reject) => {
    try {
      request.post(authOptions, (err, response, body) => {
        if (err) {
          console.log('Error requesting refresh token: ', err);
          return reject(err);
        } else if (!body) {
          const errMsg = 'No body response in requestRefreshToken...';
          console.log(errMsg);
          return reject(errMsg);
        }

        const { access_token: accessToken, expires_in: expiresIn } = body;

        console.log('Resetting access token: ', accessToken, ' expiresIn: ', expiresIn);
        req.session.accessToken = accessToken;
        req.session.expiresIn = expiresIn;

        return resolve();
      });
    } catch(err) {
      return reject(err);
    }
  });
}

module.exports = {
  refreshExpiredToken,
};