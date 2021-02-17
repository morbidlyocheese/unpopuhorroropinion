const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const fetch = require('node-fetch');

const { User, Collection } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

apiKey = process.env.API_KEY;
apiUrl = process.env.API_URL;

// get movie collections
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const collectionList = await Collection.findAll();

        return res.json({ collections: collectionList });
    }),
);

// get collection by collectionId
router.get(
    '/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const collectionId = parseInt(req.params.id, 10);
        
        const collectionOne = await Collection.findByPk(collectionId);

        // const collection = await collectionOne.json();
        
        const movies = collectionOne.movieId;
        const movieIds = [];

        for (let i = 0; i <= movies.length; i++) {
            const url = `${apiUrl}/movie/${i}?api_key=${apiKey}&language=en-US`;
            let response = await fetch(url);
            let data = await response.json();
            movieIds.push(data);
        }

        // return res.status(200).send(data);

        // console.log('res -> ', response.json)
        return { response: res.json({ collectionOne, movie: movieIds })};
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