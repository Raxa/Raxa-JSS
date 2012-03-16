describe("Ext.Panel", function() {
    var panel;
    
    beforeEach(function() {
        panel = new Ext.Panel({
            renderTo: Ext.getBody()
        });
    });
    
    afterEach(function() {
        panel.destroy();
    });
    
    it("should not scroll by default", function() {
        expect(panel.scroll).toBeFalsy();
    });
    
    it("should not be fullscreen by default", function() {
        expect(panel.fullscreen).toBeFalsy();
    });
});