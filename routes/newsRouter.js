const express = require('express');

const routes = () => {
    let newsController = require('../controllers/newsController')();
    let newsRouter = express.Router();

    newsRouter.route('/').get(newsController.get);

    return newsRouter;
};

module.exports = routes;