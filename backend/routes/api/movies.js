const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const fetch = require('node-fetch')

apiKey = process.env.API_KEY;
apiUrl = process.env.API_URL;

class MovieController {
    async discover(req, res) {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27`;

        let response = await fetch(url);
        let data = await response.json();

        return res.status(200).send(data.results);
    }

    async search(req, res) {
        const searchTerm = req.query.searchTerm;
        const url = `https://api.themoviedb.org/3/search/movie?language=en-US&api_key=${apiKey}&include_adult=false&query=${searchTerm}`;
        
        let response = await fetch(url);
        let data = await response.json();
        
        return res.status(200).send(data);
    }

    async details(req, res) {
        const { id } = req.params;
        const url = `${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`;
        
        let response = await fetch(url);
        let data = await response.json();
        
        return res.status(200).send(data);
    }
}


// get images
// https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=${apiKey}&language=en-US

// display horror genre
// https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27

// search 
// https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${search}

// single movie by id -> lists movie details
// https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US


// horror genre id -> 27
// https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}&language=en-US

// module.exports = router;

module.exports = new MovieController();