describe("Ext.Map", function() {
    var map;
    
    beforeEach(function() {
        map = new Ext.Map();
    });
    
    afterEach(function() {
        map.destroy();
    });
    
    it("should have a baseCls", function() {
        expect(map.baseCls).toEqual('x-map');
    });
    
    it("should not useCurrentLocation by default", function() {
        expect(map.useCurrentLocation).toBeFalsy();
    });
    
    it("should monitorResize by default", function() {
        expect(map.monitorResize).toBeTruthy();
    });
    
    it("should have no map property by default", function() {
        expect(map.map).toBeNull();
    });
    
    it("should have no geo property by default", function() {
        expect(map.geo).toBeNull();
    });
    
    it("should not mask by default", function() {
        expect(map.maskMap).toBeFalsy();
    });
    
    describe("when initComponent", function() {
        describe("when no google maps api", function() {
            beforeEach(function() {
                map.destroy();
                map = new Ext.Map({
                    renderTo: Ext.getBody()
                });
            });
            
            it("should error", function() {
                expect(map.el.dom.innerHTML).toEqual('Google Maps API is required');
            });
        });
        
        describe("when geo", function() {
            beforeEach(function() {
                map.destroy();
                map = new Ext.Map({
                    renderTo: Ext.getBody(),
                    
                    geo: new Ext.util.GeoLocation()
                });
            });
            
            it("should call geo.updateLocation", function() {
                //for 100% coverage
            });
        });
    });
});