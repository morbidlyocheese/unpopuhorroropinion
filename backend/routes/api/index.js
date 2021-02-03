const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
router.get('/restore-user', restoreUser, (req, res) => {
    return res.json(req.user);
});

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

module.exports = router;