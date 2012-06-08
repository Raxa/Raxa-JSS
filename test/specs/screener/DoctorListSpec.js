describe("DoctorList", function () {
    var store = null;
    var timeout = 4000;
    beforeEach(function () {
        if (!store) {
            store = Ext.create('Screener.store.DoctorList');
        }
        expect(store).toBeTruthy()
        waitsFor(
            function () {
                return !store.isLoading();
            }, "load never completed", timeout)
    });
  
    it("reading from DoctorList store & comparing with json file", function () {
        expect(store.getCount()).toEqual(2);
        expect(store.getById(0).data.uuid).toEqual("b0763c23-95e7-11e1-beba-4dc2e8449b3e");
        expect(store.getById(1).data.uuid).toEqual("050128e0-08ee-4290-a1e0-2455a1518e50");
        expect(store.getById(0).data.display).toEqual("admin - Super User");
        expect(store.getById(1).data.display).toEqual("007 - Saptarshi Purkayastha");
    });
});