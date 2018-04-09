////////////////////////////////////////////////////////////
// 'Promisifies' the request npm package
////////////////////////////////////////////////////////////
const request = require('request');

const fetchUrl = (url) => {
    return new Promise((resolve, reject) => {
        let options = {
            url: url,
            json: true
        };

        fetchUrl.request(options, (error, response, body) => {
            if (error) {
                reject(`Unable to connect to ${url}: ${error}`);
            }
            else if (response.statusCode === 200) {
                resolve(body);
            }
            else {
                reject(`Error retrieving from ${url}: ${body.message}`);
            }
        });
    });
};

fetchUrl.request = request;
module.exports = fetchUrl;
