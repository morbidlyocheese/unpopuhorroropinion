const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const fetch = require('node-fetch')

apiKey = process.env.API_KEY;
apiUrl = process.env.API_URL;

// get images
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const url = `https://api.themoviedb.org/3/movie/141/images?api_key=${apiKey}&language=en-US`;

        const baseUrl = 'https://image.tmdb.org/t/p/w500';
        const imgPath = '/kqjL17yufvn9OVLyXYpvtyrFfak.jpg';

        let response = await fetch(url);
        let data = await response.json();

        console.log('res ->', res.posters);
        return res.status(200).send(data);
    })
)

module.exports = router;