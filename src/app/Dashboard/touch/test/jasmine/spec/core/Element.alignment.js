describe("Ext.Element - alignment", function() {
    var proto = Ext.Element.prototype,
        el;
    
    beforeEach(function() {
        el = Ext.getBody().createChild({
            id: 'ExtElementHelper',
            
            style: {
                position: 'absolute',
                top     : 0,
                left    : 0,
                height  : '300px',
                width   : '300px'
            }
        });
    });
    
    describe("getAnchorXY", function() {
        describe("should return the corrent anchor", function() {
            it("c", function() {
                expect(el.getAnchorXY('c')).toEqual([150, 150]);
            });
            
            it("t", function() {
                expect(el.getAnchorXY('t')).toEqual([150, 0]);
            });
            
            it("l", function() {
                expect(el.getAnchorXY('l')).toEqual([0, 150]);
            });
            
            it("r", function() {
                expect(el.getAnchorXY('r')).toEqual([300, 150]);
            });
            
            it("b", function() {
                expect(el.getAnchorXY('b')).toEqual([150, 300]);
            });
            
            it("tl", function() {
                expect(el.getAnchorXY('tl')).toEqual([0, 0]);
            });
            
            it("bl", function() {
                expect(el.getAnchorXY('bl')).toEqual([0, 300]);
            });
            
            it("br", function() {
                expect(el.getAnchorXY('br')).toEqual([300, 300]);
            });
            
            it("tr", function() {
                expect(el.getAnchorXY('tr')).toEqual([300, 0]);
            });
        });
    });
});
