const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');

const MovieController = require('./movies');
const collectionRouter = require('./collection');
const aboutRouter = require('./about');
const splashpageRouter = require('./splashpage');

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
router.get('/restore-user', restoreUser, (req, res) => {
    return res.json(req.user);
});

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/users/:id/profile', usersRouter);

// movie specific routes
router.use('/movies/discover', MovieController.discover);
router.use('/movies/search', MovieController.search);
router.use('/movies/details/:id', MovieController.details);

// collection routes
router.use('/collections', collectionRouter);
router.use('/collections/:id', collectionRouter);

// about route
router.use('/about', aboutRouter);

// splash page route
router.use('/', splashpageRouter);

module.exports = router;