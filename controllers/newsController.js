const newsController = (options = {}) => {
    const cacheTimeout = options.cacheTimeout || 120;
    const fetchUrl = options.fetchUrl || require('../modules/fetchUrl');
    const cache = options.cache || require('../cache');
    const key = require('../keys').newsApi;

    let sources = "?sources=" +
        "bbc-news," +
        "reuters," +
        "the-guardian-uk," +
        "techradar";
    let url = `https://newsapi.org/v2/top-headlines${sources}&apiKey=${key}`;

    let get = (req, res) => {
        cache.get('news', (err, cachedNews) => {
            if (cachedNews !== null) {
                res.json(JSON.parse(cachedNews));
            } else {
                fetchUrl(url).then((response) => {
                    cache.set('news', JSON.stringify(response), 'EX', cacheTimeout, () => {
                        res.json(response);
                    });
                }, (errorMessage) => {
                    res.status(500).send(errorMessage);
                });
            }
        });
    };

    return { get: get }
};

module.exports = newsController;