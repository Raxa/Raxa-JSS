describe("Ext.util.Scroller", function() {
    var proto = Ext.util.Scroller.prototype,
        el, scrollEl, makeScroller, scroller;
    
    beforeEach(function() {
        makeScroller = function(config) {
            el = new Ext.Panel({
                id      : 'scrollerHelperEl',
                width   : 100,
                height  : 100,

                layout: 'card',

                scroll: config || 'vertical',

                items: [
                    {
                        width : 100,
                        height: 600,
                        html  : '<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>'
                    }
                ]
            });
            
            el.render(Ext.getBody());
            el.show();

            scrollEl = el.scrollEl;
            scroller = el.scroller;
        };
    });
    
    afterEach(function() {
        if (el) {
            el.destroy();
        }
        
        scrollEl = null;
        scroller = null;
    });
    
    describe("constructor", function() {
        it("should set the scroller property to the el", function() {
            makeScroller();
            
            expect(scroller.el).toEqual(scrollEl);
        });
        
        it("shoudl register the scroller", function() {
            var spy = spyOn(Ext.ScrollManager, "register").andCallThrough();
            
            makeScroller();
            
            expect(spy).wasCalled();
        });
        
        it("should add a x-scroller class", function() {
            makeScroller();
            
            expect(scrollEl.hasCls('x-scroller')).toBeTruthy();
        });
        
        it("should add a x-scroller-parent class to the parent", function() {
            makeScroller();
            
            expect(scrollEl.parent().hasCls('x-scroller-parent')).toBeTruthy();
        });
    }); 
    
    describe("doScrollEnd", function() {
        beforeEach(function() {
            makeScroller({
                horizontal: true,
                vertical  : true
            });
        });
        
        it("should fire a scrollend event", function() {
            var fired = false;
            
            scroller.on({
                scrollend: function() { fired = true; }
            });
            
            scroller.fireScrollEndEvent();
            
            expect(fired).toBeTruthy();
        });
    });
    
    describe("getOffset", function() {
        beforeEach(function() {
            makeScroller();
        });
        
        it("should return the current offset", function() {
            var result = scroller.getOffset();
            
            expect(result).toBeDefined();
            expect(result.x).toBeDefined();
            expect(result.y).toBeDefined();
        });
    });
});