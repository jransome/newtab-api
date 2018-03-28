const expect = require('chai').expect;
const sinon = require('sinon');
const rewire = require('rewire');

xdescribe('newsController', function () {
    // test pending a work around due to module pattern used in newsController the require statement usually needs to be invoked, can't do with rewire...?

    const newsController = rewire('../controllers/newsController');
    var fetchModule = newsController.__get__('fetchUrl');
    var fetchUrlSpy = sinon.spy(fetchModule);
    newsController.__set__('fetchUrl', fetchUrlSpy);

    describe('get', function () {
        it('should trigger a request to the 3rd party news api', function () {
            let mockReq = {};
            let mockRes = {
                json: sinon.spy(),
                send: sinon.spy(),
            }

            newsController.get(mockReq, mockRes);
            expect(fetchUrlSpy.called).to.equal(true);
        });
    });
});