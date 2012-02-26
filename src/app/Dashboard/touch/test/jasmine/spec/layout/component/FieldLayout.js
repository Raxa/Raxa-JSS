xdescribe("Ext.layout.FieldLayout", function() {
    var layout;
    
    beforeEach(function() {
        layout = new Ext.layout.FieldLayout({
            renderTo: Ext.getBody()
        });
    });
    
    afterEach(function() {
        layout.destroy();
    });
    
    it("should have a type", function() {
        expect(layout.type).toEqual('field');
    });
    
    describe("onLayout", function() {
        it("it should call setTargetSize", function() {
            var spy = spyOn(layout, "setTargetSize");
            
            layout.onLayout(100, 100);
            
            expect(spy).wasCalled();
        });
    });
    
    describe("handleLabel", function() {
        it("should call owner.labelEl.setWidth", function() {
            var called = false;
            
            
        });
    });
});