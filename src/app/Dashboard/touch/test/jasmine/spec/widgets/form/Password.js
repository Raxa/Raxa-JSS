describe("Ext.form.Password", function() {
    var field;
    
    beforeEach(function() {
        field = new Ext.form.Password({
            label: 'test'
        });
    });
    
    afterEach(function() {
        field.destroy();
    });
    
    it("should have a inputType", function() {
        expect(field.inputType).toEqual('password');
    });
    
    it("should not autoCapitalize", function() {
        expect(field.autoCapitalize).toBeFalsy();
    });
});