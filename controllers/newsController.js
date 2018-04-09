const newsController = (options = {}) => {
    const fetchUrl = options.fetchUrl || require('../modules/fetchUrl');
    const cache = options.cache || require('../cache');
    const cacheTimeout = options.cacheTimeout || 120;

    let sources = "?sources=" +
        "bbc-news," +
        "reuters," +
        "the-guardian-uk," +
        "techradar";
    let url = `https://newsapi.org/v2/top-headlines${sources}&apiKey=${process.env.NEWSAPIKEY}`;

    let get = (req, res) => {
        cache.get('news', (err, cachedNews) => {
            if (cachedNews !== null) {
                res.json(JSON.parse(cachedNews));
            } 
            else {
                fetchUrl(url).then((response) => {
                    cache.set('news', JSON.stringify(response), 'EX', cacheTimeout, () => {
                        res.json(response);
                    });
                }, (errorMessage) => {
                    res.send(errorMessage);
                    res.status(500);
                });
            }
        });
    };

    return { get: get }
};

module.exports = newsController;