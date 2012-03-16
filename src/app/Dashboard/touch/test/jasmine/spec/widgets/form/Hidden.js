describe("Ext.form.Hidden", function() {
    var field;
    
    beforeEach(function() {
        field = new Ext.form.Hidden({
            label: 'test'
        });
    });
    
    afterEach(function() {
        field.destroy();
    });
    
    it("should have a inputType", function() {
        expect(field.inputType).toEqual('hidden');
    });
    
    it("should have a ui", function() {
        expect(field.ui).toEqual('hidden');
    });
});