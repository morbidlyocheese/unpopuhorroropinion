const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const postersRouter = require('./posters');

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
router.get('/restore-user', restoreUser, (req, res) => {
    return res.json(req.user);
});

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/movies', moviesRouter);

router.use('/posters', postersRouter);

module.exports = router;