describe("Patients", function () {
    var mainList = null;
    var timeOut = 8000;
    beforeEach(function () {
        if (!mainList) {
            mainList = Ext.create('Screener.store.Patients');
        }
        expect(mainList).toBeTruthy();
        waitsFor(
            function () {
                return !mainList.isLoading();
            }, "store load not completed (timeout)", timeOut);
    });

    it(" reading from Patients store & comparing with REST result ", function () {

        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":["
                +"{\"uuid\": \"b0763e6d-95e7-11e1-beba-4dc2e8449b3e\",\"display\": \"Mr. Alpha d Gamma\","
                +"\"links\":[{\"uri\": \"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/b0763e6d-95e7-11e1-beba-4dc2e8449b3e\",\"rel\": \"self\"}]},"
                +"{\"uuid\": \"3c0a2629-faa4-41f2-b573-a5afac346a54\",\"display\": \"Mr Beta k Delta\","
                +"\"links\":[{\"uri\": \"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/3c0a2629-faa4-41f2-b573-a5afac346a54\",\"rel\": \"self\"}]},"
                +"{\"uuid\": \"5838ff26-cd81-4885-ac1b-83969e55eb6b\",\"display\": \"Mrs. Epsilon c Tau\","
                +"\"links\":[{\"uri\": \"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/5838ff26-cd81-4885-ac1b-83969e55eb6b\",\"rel\": \"self\"}]}]}",
                status: 200
            };
            request.success = 'true';
            // this callback is loading response(defined above) in store instead of loading a actual reponse from server
            // Callback method takes options, success and reponse as inputs
            request.callback(null, true, response);
        });

        mainList = Ext.create('Screener.store.Patients');
        expect(mainList.getData().getAt(0).getData().display).toEqual("Mr. Alpha d Gamma");
        expect(mainList.getData().getAt(1).getData().display).toEqual("Mr Beta k Delta");
        expect(mainList.getData().getAt(2).getData().display).toEqual("Mrs. Epsilon c Tau");
        expect(mainList.getData().getAt(0).getData().uuid).toEqual("b0763e6d-95e7-11e1-beba-4dc2e8449b3e");
        expect(mainList.getData().getAt(1).getData().links[0].uri).toEqual("http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/3c0a2629-faa4-41f2-b573-a5afac346a54");
        expect(mainList.getData().getAt(2).getData().links[0].rel).toEqual("self");
    });
});
