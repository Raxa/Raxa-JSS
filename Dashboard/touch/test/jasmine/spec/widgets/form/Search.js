describe("Ext.form.Search", function() {
    var field;
    
    beforeEach(function() {
        field = new Ext.form.Search({
            label: 'test'
        });
    });
    
    afterEach(function() {
        field.destroy();
    });
    
    it("should have an inputType", function() {
        expect(field.inputType).toEqual('search');
    });
});