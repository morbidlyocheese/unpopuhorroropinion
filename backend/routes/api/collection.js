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
    '/users/:id(\\d+)/collections/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const userId = req.user.id;        
        const user = parseInt(req.params.id, 10);
        const collectionId = parseInt(req.params.id, 10);
        const collections = await Collection.findByPk(collectionId, {
            where: {
                userId: userId
            }
        });
        const collectionUser = collections.dataValues.userId;
        
        const movies = collections.dataValues.movieId;
        const movieIds = [];

        for (let i = 0; i <= movies.length; i++) {
            const movie = movies[i];
            const url = `${apiUrl}/movie/${movie}?api_key=${apiKey}&language=en-US`;
            let response = await fetch(url);
            let data = await response.json();
            movieIds.push(data);
        }

        console.log('movies -->', movies)

        if (userId === collectionUser) {
            return { response: res.json({ collections, user, collectionUser, movieIds })};
            // return { response: res.json({ collections, user, collectionUser, movieIds })};
        }
    })
);
// router.get(
//     '/:id(\\d+)',
//     requireAuth,
//     asyncHandler(async (req, res) => {
//         const userId = req.user.id;        
//         const collectionId = parseInt(req.params.id, 10);
//         const collections = await Collection.findByPk(collectionId, {
//             where: {
//                 userId: userId
//             }
//         });
//         const collectionUser = collections.dataValues.userId;
        
//         const movies = collections.dataValues.movieId;
//         const movieIds = [];

//         for (let i = 0; i <= movies.length; i++) {
//             const movie = movies[i];
//             const url = `${apiUrl}/movie/${movie}?api_key=${apiKey}&language=en-US`;
//             let response = await fetch(url);
//             let data = await response.json();
//             movieIds.push(data);
//         }

//         if (userId === collectionUser) {
//             return { response: res.json({ collections, collectionUser, movie: movieIds })};
//         }
//     })
// );
    
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
        const collectionUser = collections.dataValues.userId;

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

// delete movie from collection
router.delete(
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
        const collectionUser = collections.dataValues.userId;

        const movieId = collections.dataValues.movieId;

        try {
            let { movId } = req.body;

            const movie = movieId.indexOf(movId);
            if (movie > -1) {
                movieId.splice(movie, 1);
                await collections.update({ movieId: [...collections.movieId] });
            }
            res.json({ success: true });
        } catch(e) {
            res.json({ success: false, reason: 'Something went wrong, please try again!' });
        }
    }
));

// new collection
router.post(
    '/',
    requireAuth,
    asyncHandler(async (req, res) => {
        const { name, userId } = req.body;

        const newCollection = await Collection.create({
            name,
            userId
        });

        return res.json({
            collection: newCollection,
        });
    }),
);

// delete collection
router.delete(
    '/',
    requireAuth,
    asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const collectionId = parseInt(req.params.id, 10);
        const collections = await Collection.findByPk(req.body.collectionId, {
            where: {
                userId: userId
            }
        });

        await collections.destroy();

        res.json('Collection deleted.');
    })
)

module.exports = router;