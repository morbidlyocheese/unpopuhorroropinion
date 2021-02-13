const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { User, Collection } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// get movie collections
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const collectionList = await Collection.findAll();

        return res.json({ collections: collectionList });
    }),
);

// get collection by userId
router.get(
    '/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const collectionId = parseInt(req.params.id);
        
        const collectionOne = await Collection.findByPk(collectionId, {
            where: {
                userId: userId
            }
        });
        
        return res.json({ collectionOne });
    })
);
    
// add movie to collection
router.post(
    '/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const collectionId = parseInt(req.params.id, 10);
        const collections = await Collection.findByPk(collectionId, {
            where: {
                userId: userId
            }
        });

        try {
            let { movie } = req.body;
            movie = +movie

            if (collections && collections.movieId.includes(movie)) {
                res.json({ success: false, reason: 'You already have this movie in your collection!' });
                return;
            }

            await collections.update({ movieId: [...collections.movieId, movie] });

            res.json({ success: true });
        } catch(e) {
            res.json({ success: false, reason: 'Something went wrong, please try again!' });
        }
    }
));

module.exports = router;