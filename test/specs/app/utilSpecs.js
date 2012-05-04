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

