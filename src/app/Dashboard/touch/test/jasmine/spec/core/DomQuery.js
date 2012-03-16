describe("Ext.DomQuery", function() {
    var dq = Ext.DomQuery,
        el, els;
    
    beforeEach(function() {
        el = Ext.getBody().createChild({
            id      : 'DomQueryHelper',
            children: [
                {cls: 'child', id: 'firstChild'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child2'},
                {cls: 'child2'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'}
            ]
        });
        
        els = Ext.select('#DomQueryHelper > div');
    });
    
    describe("select", function() {
        describe("with no root", function() {
            it("should return elements", function() {
                var result = dq.select('#DomQueryHelper > div');
                
                expect(result).toBeDefined();
                expect(result.length).toEqual(10);
            });
        });
        
        describe("with root", function() {
            it("should return elements", function() {
                var result = dq.select('div', 'DomQueryHelper');
                
                expect(result).toBeDefined();
                expect(result.length).toEqual(10);
            });
        });
    });
    
    describe("selectNode", function() {
        describe("with no root", function() {
            it("should return a single element", function() {
                var result = dq.selectNode('#DomQueryHelper > div');
                
                expect(result).toEqual(els.first().dom);
            });
        });
        
        describe("with root", function() {
            it("should return a single element", function() {
                var result = dq.selectNode('#firstChild', 'DomQueryHelper');
                
                expect(result).toEqual(els.first().dom);
            });
        });
    });
    
    describe("is", function() {
        describe("when element", function() {
            it("should return true", function() {
                expect(dq.is(els.first().dom, '#firstChild')).toBeTruthy();
            });

            it("should return false", function() {
                expect(dq.is(els.last().dom, '#firstChild')).toBeFalsy();
            });
        });
        
        describe("when string", function() {
            it("should return true", function() {
                expect(dq.is('firstChild', '#firstChild')).toBeTruthy();
            });

            it("should return false", function() {
                expect(dq.is('DomQueryHelper', '#firstChild')).toBeFalsy();
            });
        });
    });
});
