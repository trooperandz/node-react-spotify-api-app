const express = require('express');

const loginRoutes = require('./loginRoutes');
const newReleasesRoutes = require('./newReleasesRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const playlistRoutes = require('./playlistRoutes');
const albumRoutes = require('./albumRoutes');
const searchRoutes = require('./searchRoutes');
const appRoutes = require('./appRoutes');

const router = express.Router();
const app = express();

// If access token is present, proceed to React app; otherwise go to login page
router.get('/', (req, res) => {
  if (req.session.accessToken) {
    res.redirect('/new-releases');
  } else {
    res.render('login');
  }
});

// For testing
// router.get('/', (req, res) => {
//   return res.render('app');
// });

// Establish all routes
router.use('/login', loginRoutes);
router.use('/app', appRoutes); // app-wide, container-agnostic routes
router.use('/new-releases', newReleasesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/playlist', playlistRoutes);
router.use('/album', albumRoutes);
router.use('/search', searchRoutes);

module.exports = router;
