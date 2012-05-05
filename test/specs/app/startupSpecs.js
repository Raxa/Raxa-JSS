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
        views = [];
        Startup.getViewRequestHandler(getRequests[0], views, 'testModule1');
        var actual = views[2][0];
        var expected = 'testModule1' + ' view3'
        expect(actual).toEqual(expected);
    });

    it("returns an error code when no views are defined", function () {
        var actual = Startup.getViewRequestHandler(getRequests[1], views, 'testModule2');
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
        Startup.createViewGetRequest('testModuleAddr', 'testModule', views);
        var actual = views[0][1];
        var expected = 'testModule/#view1';
        expect(actual).toEqual(expected);
    });

});