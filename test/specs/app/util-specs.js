/**
 * This is the script for jasmine specs to test src/resources/scripts/util.js
 */
describe("Get Basic Auth Header", function () {
    it("returns BasicAuthHeader", function () {
        expect(Util.getBasicAuthHeader("admin", "Hello123")).toEqual("Authorization: Basic YWRtaW46SGVsbG8xMjM=");
    });
});

describe("Get JSON Accept Type", function () {
    it("returns AcceptType", function () {
        expect(Util.getJsonAcceptType()).toEqual("Accept: application/json");
    });
});

describe("Get JSON Content-Type", function () {
    it("returns Content-Type", function () {
        expect(Util.getJsonContentType()).toEqual("Content-Type: application/json");
    });
});