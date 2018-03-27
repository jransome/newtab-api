const express = require('express');
const fetchUrl = require('../modules/fetchUrl');
const key = require('../keys').newsApi;

const routes = () => {
    const newsRouter = express.Router();
    const sources = "?sources=" +
        "bbc-news," +
        "reuters," +
        "the-guardian-uk," +
        "techradar";

    newsRouter.route('/').get((req, res) => {
        // Make 3rd party request
        let url = `https://newsapi.org/v2/top-headlines${sources}&apiKey=${key}`;
        fetchUrl(url).then((response) => {
            res.json(response);
        }, (errorMessage) => {
            res.status(500).send(errorMessage);
        });
    });

    return newsRouter;
};

module.exports = routes;