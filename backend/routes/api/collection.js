const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { User, Collection } = require('../../db/models');

// all collections by a user
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const collection = await Collection.findAll({
            include: User
        });

        return res.json({
            collections: collection
        });
    })
);

// single collection
router.get(
    '/:id(\\d+)',
    asyncHandler(async (req, res) => {
        const collectionId = parseInt(req.params.id);
        const collection = await Collection.findByPk(collectionId, {
            include: [{ model: User}]
        });

        return res.json({
            collection
        });
    })
);

// create a collection
router.post(
    '/:id(\\d+)',
    asyncHandler(async (req, res) => {
        const userId = res.locals.user.dataValues.id;
        const collectionId = parseInt(req.params.id, 10);

        const collection = await Collection.findOne({
            where: {
                collectionId: collectionId,
                userId: userId
            }
        });
    })
);

// add movie to collection
router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { movieId } = req.body;

        const newMovie = await Collection.create({
            movieId
        });

        const collection = await Collection.findByPk(collectionId, {
            include: [{ model: User }]
        });

        return res.json({
            collection
        });
    }),
);

module.exports = router;