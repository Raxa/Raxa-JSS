describe("controller", function() {
    
    var store = null, ctlr = null, view = null;

    beforeEach(function(){
        if (!ctlr) {
            ctlr = Application.getController('control');
        }

        if (!store) {
            store = Application.getStore('dispensestore');
        }
		if(!view)
		{
			view = Ext.create('Ext.Container', {
				items: [{
					xtype: 'dispenseView',
					title: 'Drug Dispense in this package',
					
				}]
			});
		}

        expect(store).toBeTruthy()
        waitsFor(
            function(){
                return !store.isLoading();
            },
            "load never completed",
            4000
         )
		//console.log(view.getComponent(0).store)
    });
    it("should have users",function(){
        expect(store.getCount()).toBeGreaterThan(0);
		expect(store.getCount()).toBeLessThan(4);
    });
	it("values of 1st data for drug dispensed in the store of view should match with the store of application",function(){
		expect(store.getAt(0).data.drugname).toEqual(view.getComponent(0).store.getAt(0).data.drugname);
		expect(store.getAt(0).data.dosage).toEqual(view.getComponent(0).store.getAt(0).data.dosage);
		expect(store.getAt(0).data.disp).toEqual(view.getComponent(0).store.getAt(0).data.disp);
		expect(store.getAt(0).data.instock).toEqual(view.getComponent(0).store.getAt(0).data.instock);
		expect(store.getAt(0).data.labels).toEqual(view.getComponent(0).store.getAt(0).data.labels);
		expect(store.getAt(0).data.inhand).toEqual(view.getComponent(0).store.getAt(0).data.inhand);
	});
});