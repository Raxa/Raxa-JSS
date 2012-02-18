xdescribe("Ext.ProgressBar", function() {
    var pb;
    
    beforeEach(function() {
        pb = new Ext.ProgressBar({
            renderTo: Ext.getBody()
        });
    });
    
    afterEach(function() {
        pb.destroy();
    });
    
    it("should have a default value of 0", function() {
        expect(pb.value).toEqual(0);
    });
    
    it("should have no text", function() {
        expect(pb.text).toEqual('');
    });
    
    it("should animate by default", function() {
        expect(pb.animate).toBeTruthy();
    });
    
    it("should have animDefaults", function() {
        expect(pb.animDefaults).toBeDefined();
    });
    
    it("should have a default height", function() {
        expect(pb.height).toEqual(22);
    });
    
    it("should have a baseCls", function() {
        expect(pb.baseCls).toEqual('x-progress');
    });
    
    it("should have a default minValue", function() {
        expect(pb.minValue).toEqual(0);
    });
    
    it("should have a default maxValue", function() {
        expect(pb.maxValue).toEqual(100);
    });
    
    it("should have a waitTimer of null", function() {
        expect(pb.waitTimer).toBeNull();
    });
    
    it("should have a template", function() {
        expect(pb.renderTpl).toBeDefined();
    });
});