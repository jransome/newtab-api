const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const sinonStubPromise = require('sinon-stub-promise');
const expect = chai.expect;
chai.use(sinonChai);
sinonStubPromise(sinon);

describe('newsController', () => {
    let mockFetchUrl;
    let mockCache = {};
    let newsController;

    beforeEach(() => {
        mockFetchUrl = sinon.stub().returnsPromise();
        let options = { fetchUrl: mockFetchUrl, cache: mockCache };
        newsController = require('../controllers/newsController')(options);
    });

    describe('#get', () => {
        describe('when cache is working', () => {
            beforeEach(() => {
                mockCache.ready = true
            });

            describe('when there is nothing cached', () => {
                beforeEach(() => {
                    // stub the cache to return nothing and force an api request to be made
                    mockCache.get = sinon.stub().callsArgWith(1, null, null);
                    // stub cache to fire callback after storing data
                    mockCache.set = sinon.stub().callsArg(4);
                });

                it('should trigger a request to the 3rd party news api', () => {
                    let mockReq = {};
                    let mockRes = {};
                    newsController.get(mockReq, mockRes);

                    expect(mockFetchUrl).called;
                });

                it('should send back the resulting JSON from the 3rd party api', () => {
                    let mock3rdPartResponse = { news: 'news' };
                    let mockReq = {};
                    let mockRes = { json: sinon.spy() };

                    // stub fetchUrl to resolve with fake JSON
                    mockFetchUrl.resolves(mock3rdPartResponse);
                    newsController.get(mockReq, mockRes);

                    expect(mockRes.json).calledWith(mock3rdPartResponse);
                });

                it('if the 3rd party request rejects with an error, it should send back that error', () => {
                    let mock3rdPartError = 'Error';
                    let mockReq = {};
                    let mockRes = { send: sinon.spy() };

                    // stub fetchUrl to reject with fake error message
                    mockFetchUrl.rejects(mock3rdPartError);
                    newsController.get(mockReq, mockRes);

                    expect(mockRes.send).calledWith(mock3rdPartError);
                });
            });

            describe('when news data has been previously cached', () => {
                it('should respond with the cached data', () => {
                    // stub the cache to return fake data
                    let mockCachedData = JSON.stringify({ news: 'news' });
                    mockCache.get = sinon.stub().callsArgWith(1, null, mockCachedData);

                    let mockReq = {};
                    let mockRes = { json: sinon.spy() };

                    newsController.get(mockReq, mockRes);

                    let expectedResponse = JSON.parse(mockCachedData);
                    expect(mockRes.json).calledWith(expectedResponse);
                });
            });
        });
    });
});