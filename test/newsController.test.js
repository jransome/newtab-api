const expect = require('chai').expect;
const sinon = require('sinon');
const sinonStubPromise = require('sinon-stub-promise');
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

                expect(mockFetchUrl.called).to.equal(true);
            });

            it('should send back the resulting JSON from the 3rd party api', () => {
                let mock3rdPartResponse = {};
                let mockReq = {};
                let mockRes = { json: sinon.spy() }

                // stub fetchUrl to resolve with fake JSON
                mockFetchUrl.resolves(mock3rdPartResponse);
                newsController.get(mockReq, mockRes);

                expect(mockRes.json.calledWith(mock3rdPartResponse)).to.equal(true);
            });
        });
    });
});