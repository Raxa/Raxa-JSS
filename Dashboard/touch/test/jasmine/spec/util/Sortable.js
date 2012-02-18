describe("Ext.util.Sortable", function() {
    var tabPanel, sortable, createSortable, proto, e,
        called = false;
    
    beforeEach(function() {
        tabPanel = new Ext.TabPanel({
            items: [
                {text: 'One'},
                {text: 'Two'},
                {text: 'Three'}
            ],
            sortable: true,
            
            renderTo: Ext.getBody()
        });
        
        createSortable = function(config) {
            return new Ext.util.Sortable(tabPanel.el, Ext.apply({
                itemSelector: '.x-tab',
                direction   : 'horizontal',
                delay       : 350,
                constrain   : true
            }, config || {}));
        };
        
        proto = Ext.util.Sortable.prototype;
    });
    
    afterEach(function() {
        e = {};
        called = false;
        
        if (sortable && sortable.destroy) sortable.destroy();
        tabPanel.destroy();
    });
    
    it("should have a baseCls", function() {
        expect(proto.baseCls).toEqual('x-sortable');
    });
    
    it("should have a direction", function() {
        expect(proto.direction).toEqual('vertical');
    });
    
    it("should not have a cancelSelector", function() {
        expect(proto.cancelSelector).toBeNull();
    });
    
    it("should constrain to window", function() {
        expect(proto.constrain).toEqual(window);
    });
    
    it("should have a group", function() {
        expect(proto.group).toEqual('base');
    });
    
    it("should revert", function() {
        expect(proto.revert).toBeTruthy();
    });
    
    it("should have no handleSelector", function() {
        expect(proto.handleSelector).toBeNull();
    });
    
    it("should not be disabled", function() {
        expect(proto.disabled).toBeFalsy();
    });
    
    it("should have no delay", function() {
        expect(proto.delay).toEqual(0);
    });
    
    it("should not be sorting", function() {
        expect(proto.isSorting()).toBeFalsy();
    });
    
    it("should not be isVertical()", function() {
        expect(proto.isVertical()).toBeFalsy();
    });
    
    it("should not be isHorizontal()", function() {
        expect(proto.isHorizontal()).toBeFalsy();
    });
    
    describe("constructor", function() {
        describe("direction", function() {
            describe("when vertical", function() {
                beforeEach(function() {
                    sortable = createSortable({
                        direction: 'vertical'
                    });
                });

                it("should set isVertical()", function() {
                    expect(sortable.isVertical()).toBeTruthy();
                    expect(sortable.isHorizontal()).toBeFalsy();
                });
            });

            describe("when horizontal", function() {
                beforeEach(function() {
                    sortable = createSortable({
                        direction: 'horizontal'
                    });
                });
            
                it("should set isHorizontal()", function() {
                    expect(sortable.isHorizontal()).toBeTruthy();
                    expect(sortable.isVertical()).toBeFalsy();
                });
            });
            
            describe("when none", function() {
                beforeEach(function() {
                    sortable = createSortable({
                        direction: null
                    });
                });
                
                it("should set isVertical() and horizontal", function() {
                    expect(sortable.isVertical()).toBeTruthy();
                    expect(sortable.isHorizontal()).toBeTruthy();
                });
            });
        });
        
        it("should add the el", function() {
            sortable = createSortable();
            
            expect(sortable.el).toBeDefined();
        });
    });
    
    describe("calculateBoxes", function() {
        beforeEach(function() {
            sortable = createSortable();
            sortable.calculateBoxes();
        });
        
        it("should create an array of items", function() {
            expect(sortable.items.length).toBeDefined();
            expect(sortable.items.length).toEqual(3);
        });
    });
    
    describe("enable", function() {
        it("should call el.on", function() {
            var spy = spyOn(sortable.el, "on");
            
            sortable.enable();
            
            expect(spy).wasCalled();
        });
    });
    
    describe("disable", function() {
        it("should call el.un", function() {
            var spy = spyOn(sortable.el, "un");
            
            sortable.disable();
            
            expect(spy).wasCalled();
        });
    });
});
