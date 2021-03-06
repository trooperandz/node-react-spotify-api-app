const constants = {
  SPOTIFY_CLIENT_ID: '383049bf50384a10ac81ec150c588c31',
  SPOTIFY_CLIENT_SECRET: '3588f23fea1544c9a9fb9966eeeb148c',
  REDIRECT_URI: process.env.NODE_ENV === 'production' ? 'https://spotify.mtholla.com/login/callback' : 'http://localhost:5006/login/callback',
  // REDIRECT_URI: 'https://spotify.mtholla.com/login/callback', // for the prod version
  // REDIRECT_URI: 'http://localhost:5006/login/callback',
  FRONTEND_URI: 'http://localhost:8080',
  SPOTIFY_BASE_URL: 'https://api.spotify.com/v1',
};

module.exports = constants;