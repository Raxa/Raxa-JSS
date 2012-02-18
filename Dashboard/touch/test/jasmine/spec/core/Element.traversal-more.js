describe("Ext.Element - traversal - more", function() {
    var proto = Ext.Element,
        el, testEl,
        input, testInputEl,
        child1, child2, child3, child4, child5;
    
    beforeEach(function() {
        testEl = Ext.getBody().createChild({
            id      : 'ExtElementHelper',
            cls     : 'wrapper',
            style   : 'position:absolute;',
            children: [
                {id: 'child1', style: 'position:absolute;'},
                {id: 'child2', style: 'position:absolute;'},
                {id: 'child3', style: 'position:absolute;'},
                {
                    id: 'child4',
                    children: [
                        {
                            id : 'child5',
                            cls: 'findIt'
                        }
                    ]
                }
            ]
        });
        
        testInputEl = Ext.getBody().createChild({
            id  : 'ExtElementInputHelper',
            tag : 'input',
            type: 'text'
        });
        
        el    = new Ext.Element(Ext.getDom(testEl));
        input = new Ext.Element(Ext.getDom(testInputEl));
        
        child1 = Ext.get('child1');
        child2 = Ext.get('child2');
        child3 = Ext.get('child3');
        child4 = Ext.get('child4');
        child5 = Ext.get('child5');
    });
        
    describe("getScrollParent", function() {
        describe("when no parent scroller", function() {
            it("should return null", function() {
                expect(child5.getScrollParent()).toBeNull();
            });
        });
        
        xdescribe("when parent is a scroller", function() {
            it("should return the scroller", function() {
                var scroller = new Ext.util.Scroller(testEl);
                
                expect(child5.getScrollParent()).toEqual(scroller);
            });
        });
    });
});
