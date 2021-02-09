const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const MovieController = require('./movies');
// const movieRouter = require('./movies');
const collectionRouter = require('./collection');

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
router.get('/restore-user', restoreUser, (req, res) => {
    return res.json(req.user);
});

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

// movie specific routes
router.use('/movies/discover', MovieController.discover);
router.use('/movies/search', MovieController.search);
router.use('/movies/details/:id', MovieController.details);

// collection routes
router.use('/collections', collectionRouter);

module.exports = router;