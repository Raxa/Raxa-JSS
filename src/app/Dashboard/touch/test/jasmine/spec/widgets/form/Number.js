describe("Ext.form.Number", function() {
    var field;
    
    beforeEach(function() {
        field = new Ext.form.Number({
            label: 'test'
        });
    });
    
    afterEach(function() {
        field.destroy();
    });
    
    it("should have a inputType", function() {
        expect(field.inputType).toEqual('number');
    });
    
    it("should have no minValue", function() {
        expect(field.minValue).not.toBeDefined();
    });
    
    it("should have no maxValue", function() {
        expect(field.maxValue).not.toBeDefined();
    });
    
    it("should have no stepValue", function() {
        expect(field.stepValue).not.toBeDefined();
    });
    
    it("should have a renderTpl", function() {
        expect(field.renderTpl).toBeDefined();
    });
    
    it("should have a ui", function() {
        expect(field.ui).toEqual('number');
    });
    
    describe("on render", function() {
        it("should apply minValue, maxValue, stepValue to renderData", function() {
            var spy = spyOn(Ext, "apply").andCallThrough();
            
            field.render(Ext.getBody());
            
            expect(spy).wasCalledWith(field.renderData, {
                minValue : field.minValue,
                maxValue : field.maxValue,
                stepValue: field.stepValue
            });
        });
    });
});