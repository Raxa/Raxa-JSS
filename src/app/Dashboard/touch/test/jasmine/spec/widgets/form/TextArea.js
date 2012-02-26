describe("Ext.form.TextArea", function() {
    var field;
    
    beforeEach(function() {
        field = new Ext.form.TextArea({
            label  : 'test'
        });
    });
    
    afterEach(function() {
        field.destroy();
    });
    
    it("should not have maxRows", function() {
        expect(field.maxRows).not.toBeDefined();
    });
    
    it("should not autoCapitalize", function() {
        expect(field.autoCapitalize).toBeFalsy();
    });
    
    describe("on render", function() {
        beforeEach(function() {
            field = new Ext.form.TextArea({
                label  : 'test',
                maxRows: 10
            });
        });
        
        it("should add maxRows to renderData", function() {
            expect(field.renderData.maxRows).not.toBeDefined();
            
            field.render(Ext.getBody());
            
            expect(field.renderData.maxRows).toBeDefined();
        });
    });
});