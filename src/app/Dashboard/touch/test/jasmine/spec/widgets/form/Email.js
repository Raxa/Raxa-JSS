describe("Ext.form.Email", function() {
    var field;
    
    beforeEach(function() {
        field = new Ext.form.Email({
            label: 'test'
        });
    });
    
    afterEach(function() {
        field.destroy();
    });
    
    it("should have a inputType", function() {
        expect(field.inputType).toEqual('email');
    });
    
    it("should not autoCapitalize", function() {
        expect(field.autoCapitalize).toBeFalsy();
    });
});