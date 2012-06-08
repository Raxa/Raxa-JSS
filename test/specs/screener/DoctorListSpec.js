describe("DoctorList", function () {
    var store = null;
    var timeout = 4000;
    beforeEach(function () {
        Util.saveBasicAuthHeader("admin","Hello123");
        if (!store) {
            store = Ext.create('Screener.store.DoctorList');
        }
        expect(store).toBeTruthy()
        waitsFor(
            function () {
                return !store.isLoading();
            }, "load never completed", timeout)
    });
  
    it("reading from DoctorList store & comparing with REST result", function () {
        expect(store.getCount()).toBeGreaterThan(0);
        expect(store.getData().getAt(0).getData().uuid).not.toEqual(null);
    });
});