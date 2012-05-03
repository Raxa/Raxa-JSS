/**
 * This is the script for jasmine specs to test src/resources/scripts/util.js
 */
describe("Check authentication, save authorization header if correct", function () {
    var correctPassword = false;
    beforeEach(function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"sessionId\":\"E603DC2DA64703EA08F8B234DB31B630.node1\",\"authenticated\":" + correctPassword + "}"
            };
            request.success.call(request.scope, response);
        });
    });

    it('DO NOT save on incorrect user/pass', function () {
        correctPassword = false;
        Util.saveBasicAuthHeader('admin', 'admin');
        expect(localStorage.getItem("basicAuthHeader")).toEqual(null);
    });

    it('DO save on correct user/pass', function () {
        correctPassword = true;
        Util.saveBasicAuthHeader('admin', 'Hello123');
        expect(localStorage.getItem("basicAuthHeader")).toEqual("Basic YWRtaW46SGVsbG8xMjM=");
    });
});


describe("Get Correct Authorization in Header", function () {
    it("returns BasicAuthHeader", function () {
        localStorage.setItem("basicAuthHeader", "Basic " + window.btoa("admin:Hello123"));
        var actual = Util.getBasicAuthHeaders()['Authorization'];
        var expected = "Basic YWRtaW46SGVsbG8xMjM=";
        expect(actual).toEqual(expected);
    });
});

describe("Get JSON Accept Type", function () {
    it("returns AcceptType", function () {
        var actual = Util.getBasicAuthHeaders()['Accept'];
        var expected = "application/json";
        expect(actual).toEqual(expected);
    });
});

describe("Get JSON Content-Type", function () {
    it("returns Content-Type", function () {
        var actual = Util.getBasicAuthHeaders()['Content-Type'];
        var expected = "application/json";
        expect(actual).toEqual(expected);
    });
});

describe("Get View Request Handler", function () {
    views = [];
    getCallsLeft = 10;
    getRequests = [{
        'readyState': 4,
        'status': 200,
        'responseText': 'views: [\'view1\', \'view2\', \'view3\']'
    }, {
        'readyState': 4,
        'status': 200,
        'responseText': 'nothing defined'
    }, {
        'readyState': 4,
        'status': 404,
        'responseText': null
    }];

    it("adds views into an array", function () {
        Util.getViewRequestHandler(getRequests[0], views, 'testModule1');
        var actual = views[2][0];
        var expected = 'testModule1' + ' view3'
        expect(actual).toEqual(expected);
    });

    it("returns an error code when no views are defined", function () {
        var actual = Util.getViewRequestHandler(getRequests[1], views, 'testModule2');
        var expected = 'noViewsDefined';
        expect(actual).toEqual(expected);
    });

});

describe("Create View Request", function () {
    it("sends out GET to add view", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                status: 200,
                responseText: 'views: [\'view1\', \'view2\']'
            };
            request.success.call(request.scope, response);
        });
        views = [];
        Util.createViewGetRequest('testModuleAddr', 'testModule', views);
        var actual = views[0][1];
        var expected = 'testModule/#view1';
        expect(actual).toEqual(expected);
    });

});