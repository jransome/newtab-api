const nock = require('nock');
const expect = require('chai').expect;

// Note for now this test also tests the request npm package...
describe('fetchUrl', () => {
    const fetchUrl = require('../modules/fetchUrl');
    const url = "https://api.org";
    const endPoint = "/data";
    const goodApiResponse = { data: "data" };
    const badApiResponse = { message: "error" };

    it('should fetch data from a url', async () => {
        let goodCall = nock(url)
            .get(endPoint)
            .reply(200, goodApiResponse)

        const result = await fetchUrl(url + endPoint);
        expect(result).to.eql(goodApiResponse);
    });

    xit("should throw an error if it can't connect", async () => {
        let goodCall = nock(url)
            .get(endPoint)
            .reply(500, badApiResponse)
        
        const result = await fetchUrl(url + endPoint);
        expect(result).to.throw(`Error retrieving from ${url + endPoint}: ${badApiResponse.message}`);
    });
});