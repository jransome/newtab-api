const fetchUrl = require('../modules/fetchUrl');

const newsController = () => {
    let key = require('../keys').newsApi;
    let sources = "?sources=" +
            "bbc-news," +
            "reuters," +
            "the-guardian-uk," +
            "techradar";

    let get = (req, res) => {
        // Make 3rd party request
        let url = `https://newsapi.org/v2/top-headlines${sources}&apiKey=${key}`;
        fetchUrl(url).then((response) => {
            res.json(response);
        }, (errorMessage) => {
            res.status(500).send(errorMessage);
        });
    }

    return { get: get }
};

module.exports = newsController;