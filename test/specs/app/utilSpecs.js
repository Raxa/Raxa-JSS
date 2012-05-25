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

describe("Get deviceId (6 digit randomly generated number)", function () {
    it("Get deviceId (6 digit), when deviceId is not present in localStorage", function () {

        //deleting deviceId key here to ensure no deviceId is stored before
        localStorage.removeItem("deviceId");
        var deviceId = Util.getDeviceId();
        expect((deviceId >= 100000 && deviceId < 1000000)).toEqual(true);
    });

    it("Get device id same as that in localStorage (if already stored)", function () {

        var storedDeviceId = '123456';

        //setting a new deviceId key equal to 123456
        localStorage.setItem("deviceId", storedDeviceId);
        var deviceId = Util.getDeviceId();
        expect(deviceId).toEqual(storedDeviceId);
    });

    it("checks the randomness of deviceId randomness for 20 randomly generated numbers", function () {

        //duplicate is set to true if any two (out of twenty) randomly generate numbers are equal	
        var duplicate = false;
        var deviceId = new Array(20);
        for (var i = 0; i < 20; i++) {
            //deleting deviceId key here to ensure no deviceId is stored before and ensure random number
            localStorage.removeItem("deviceId");
            deviceId[i] = Util.getDeviceId();
            for (j = 0; j < i; j++) {
                if (deviceId[j] == deviceId[i]) {
                    duplicate = true;
                }
            }
        }
        expect(duplicate).toEqual(false);
    });
});
