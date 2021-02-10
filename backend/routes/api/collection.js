const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { User, Collection } = require('../../db/models');

// get movie collections
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const collectionList = await Collection.findAll({
            include: User
        });

        return res.json({ collections: collectionList });
    }),
);

// get collection by userId
router.get(
    '/:id(\\d+)',
    asyncHandler(async (req, res) => {
        const collectionId = parseInt(req.params.id);
        const collectionOne = await Collection.findByPk(collectionId, {
            include: [{ model: User }]
        });

        const collectionList = collectionOne.map((collection) => {
            return {
                name: collection.name,
                pictures: collection.pictures,
                movieId: collection.movieId,
                watched: collection.watched
            }
        });

        return res.json({ collectionList });
    })
);

// add movie to collection
router.post(
    '/',
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const user = await User.findByPk(userId);
        const { movie } = req.body;
        const collection = user.collection;

        if (collection.includes(movie)) {
            res.json('You already have this movie in your collection!');
            return;
        }

        collection.push(movie);

        await user.update({ collection });
        res.json(collection);
    }
));

module.exports = router;