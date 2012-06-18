describe("DoctorList", function () {
    var store = null;
    var timeout = 10000;
    beforeEach(function () {
        Util.saveBasicAuthHeader("admin","Hello123");
        if (!store) {
            store = Ext.create('Screener.store.Doctors');
        }
        expect(store).toBeTruthy()
        waitsFor(
            function () {
                return !store.isLoading();
            }, "load never completed", timeout)
    });
  
    it("reading from Doctors store & comparing with REST result", function () {
        expect(store.getCount()).toBeGreaterThan(0);
        expect(store.getData().getAt(0).getData().uuid).not.toEqual(null);
    });
    
    it("returns values to the store on a ajax call", function (){                
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"testuuid1\",\"display\":\"testdoc1\"}," +
                "{\"uuid\":\"testuuid2\",\"display\":\"testdoc2\"}]}", 
                status: 200
            };
            request.callback(null,true,response)  
        });
        store = Ext.create('Screener.store.Doctors');
        expect(store.getData().getAt(0).getData().uuid).toEqual("testuuid1");
        expect(store.getData().getAt(0).getData().display).toEqual("testdoc1");
        expect(store.getData().getAt(1).getData().uuid).toEqual("testuuid2");
        expect(store.getData().getAt(1).getData().display).toEqual("testdoc2");
    })
});