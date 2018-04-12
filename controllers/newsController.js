const newsController = (options = {}) => {
    const fetchUrl = options.fetchUrl || require('../modules/fetchUrl');
    const cache = options.cache || require('../cache');
    const cacheTimeout = options.cacheTimeout || 120;

    const sources = "?sources=" +
        "bbc-news," +
        "reuters," +
        "the-guardian-uk," +
        "techradar";
    const url = `https://newsapi.org/v2/top-headlines${sources}&apiKey=${process.env.NEWSAPIKEY}`;

    const fetchNews = (res) => fetchUrl(url).then((response) => {
        res.json(response);
        return response;
    }, (errorMessage) => {
        res.send(errorMessage);
        res.status(500);
    });

    const get = (req, res) => {
        if (cache.ready) {
            cache.get('news', (err, cachedNews) => {
                if (cachedNews !== null) {
                    res.json(JSON.parse(cachedNews));
                }
                else {
                    fetchNews(res).then((response) => {
                        cache.set('news', JSON.stringify(response), 'EX', cacheTimeout);
                    });
                }
            });
        }
        else {
            fetchNews(res);
        }
    };

    return { get };
};

module.exports = newsController;