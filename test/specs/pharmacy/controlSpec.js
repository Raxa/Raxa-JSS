describe("controller", function() {
    
    var store = null, ctlr = null, view = null;

    beforeEach(function(){
        if (!ctlr) {
            ctlr = Application.getController('control');
        }

        if (!store) {
            store = Application.getStore('dispensestore');
        }
		
        expect(store).toBeTruthy();
        waitsFor(
            function(){
                return !store.isLoading();
            },
            "load never completed",
            4000
            );
    });
    it("should have users",function(){
        expect(store.getCount()).toBeGreaterThan(0);
		expect(store.getCount()).toBeLessThan(4);
    });
	it("1st user should match with the test file",function(){
		expect(store.getAt(0).data.drugname).toEqual('A');
		expect(store.getAt(0).data.dosage).toEqual('B');
		expect(store.getAt(0).data.disp).toEqual('C');
		expect(store.getAt(0).data.instock).toEqual('D');
		expect(store.getAt(0).data.labels).toEqual('E');
		expect(store.getAt(0).data.inhand).toEqual('F');
	});
});