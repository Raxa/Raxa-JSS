describe("Ext.util.Draggable", function() {
    var createDraggable, draggable, btn, e, panel,
        proto  = Ext.util.Draggable.prototype,
        called = false;
    
    beforeEach(function() {
        btn = new Ext.Button({
            text    : 'Button',
            renderTo: Ext.getBody()
        });
        
        createDraggable = function(config) {
            return new Ext.util.Draggable(btn.el, config);
        };
    });
    
    afterEach(function() {
        e = {};
        called = false;
        
        btn.destroy();
        if (draggable && draggable.destroy) draggable.destroy();
    });
    
    it("should have a baseCls", function() {
        expect(proto.baseCls).toEqual('x-draggable');
    });
    
    it("should have a draggingCls", function() {
        expect(proto.draggingCls).toEqual('x-dragging');
    });
    
    it("should have a proxyCls", function() {
        expect(proto.proxyCls).toEqual('x-draggable-proxy');
    });
    
    it("should have a direction", function() {
        expect(proto.direction).toEqual('both');
    });
    
    it("should have no delay", function() {
        expect(proto.delay).toEqual(0);
    });
    
    it("should have no cancelSelector", function() {
        expect(proto.cancelSelector).toBeNull();
    });
    
    it("should not be disabled", function() {
        expect(proto.disabled).toBeFalsy();
    });
    
    it("should not revert", function() {
        expect(proto.revert).toBeFalsy();
    });
    
    it("should constrain to the window", function() {
        expect(proto.constrain).toEqual(window);
    });
    
    it("should have a group", function() {
        expect(proto.group).toEqual('base');
    });
    
    it("should not be dragging", function() {
        expect(proto.isDragging()).toBeFalsy();
    });
    
    it("should not be isVertical()", function() {
        expect(proto.isVertical()).toBeFalsy();
    });
    
    it("should not be isHorizontal()", function() {
        expect(proto.isHorizontal()).toBeFalsy();
    });
    
    it("should not have a threshold", function() {
        expect(proto.threshold).toEqual(0);
    });
    
    describe("constructor", function() {
        it("should set the el", function() {
            draggable = createDraggable();
            
            expect(draggable.el).toEqual(btn.el);
        });
        
        describe("direction", function() {
            it("none", function() {
                draggable = createDraggable();
                
                expect(draggable.isHorizontal()).toBeTruthy();
                expect(draggable.isVertical()).toBeTruthy();
            });
            
            it("both", function() {
                draggable = createDraggable({
                    direction: 'both'
                });
                
                expect(draggable.isHorizontal()).toBeTruthy();
                expect(draggable.isVertical()).toBeTruthy();
            });
            
            it("horizontal", function() {
                draggable = createDraggable({
                    direction: 'horizontal'
                });
                
                expect(draggable.isHorizontal()).toBeTruthy();
                expect(draggable.isVertical()).toBeFalsy();
            });
            
            it("vertical", function() {
                draggable = createDraggable({
                    direction: 'vertical'
                });
                
                expect(draggable.isHorizontal()).toBeFalsy();
                expect(draggable.isVertical()).toBeTruthy();
            });
        });
        
        it("should add the baseCls to the el", function() {
            expect(btn.el.hasCls(proto.baseCls)).toBeFalsy();
            
            draggable = createDraggable();
            
            expect(draggable.el.hasCls(draggable.baseCls)).toBeTruthy();
            expect(btn.el.hasCls(draggable.baseCls)).toBeTruthy();
        });
        
        describe("startEventName", function() {
            describe("when delay > 0", function() {
                it("taphold", function() {
                    draggable = createDraggable({
                        delay: 400
                    });
                    
                    expect(draggable.startEventName).toEqual('taphold');
                });
            });
            
            describe("when delay == 0", function() {
                it("dragstart", function() {
                    draggable = createDraggable();
                    
                    expect(draggable.startEventName).toEqual('dragstart');
                });
            });
        });
    });
    
    describe("onStart", function() {
        beforeEach(function() {
            e = {
                browserEvent: {
                    preventDefault : function() {},
                    stopPropagation: function() {}
                },
                getTarget: function(v) {
                    if (v == 'cancelSelector') return true;
                    return false;
                },
                type     : 'tapstart',
                deltaType: 0
            };
        });
        
        describe("cancelSelector", function() {
            describe("when cancelSelector and found", function() {
                it("should not continue", function() {
                    draggable = createDraggable({
                        cancelSelector: 'cancelSelector'
                    });
                    
                    draggable.onStart(e);
                });
            });
            
            describe("when no cancelSelector and not found", function() {
                it("should continue", function() {
                    draggable = createDraggable({
                        cancelSelector: false
                    });
                    
                    draggable.onStart(e);
                });
            });
        });
    });
    
    xdescribe("prepareDrag", function() {
        beforeEach(function() {
            e = {
                pageX: 0,
                pageY: 0
            };
            
            draggable = createDraggable();
        });
        
        it("should call reset", function() {
            var spy = spyOn(draggable, "reset");
            
            draggable.prepareDrag(e);
            
            expect(spy).wasCalled();
        });
        
        describe("constrain", function() {
            describe("when window", function() {
                it("should create a constrainRegion", function() {
                    draggable.prepareDrag(e);
                    
                    expect(draggable.constrainRegion.top).toEqual(0);
                    expect(draggable.constrainRegion.right).toEqual(window.innerWidth);
                    expect(draggable.constrainRegion.bottom).toEqual(window.innerHeight);
                    expect(draggable.constrainRegion.left).toEqual(0);
                });
            });
            
            describe("when el", function() {
                beforeEach(function() {
                    draggable.destroy();
                    
                    panel = new Ext.Panel({
                        width : 500,
                        height: 300,
                        
                        renderTo: Ext.getBody()
                    });
                    
                    draggable = createDraggable({
                        constrain: panel.el
                    });
                });
                
                afterEach(function() {
                    panel.destroy();
                });
                
                it("should create a constrainRegion", function() {
                    draggable.prepareDrag(e);
                    
                    expect(draggable.constrainRegion).toBeDefined();
                });
            });
        });
        
        it("should create startRegion", function() {
            draggable.prepareDrag(e);
            
            expect(draggable.startRegion).toBeDefined();
        });
        
        it("should create offsetToCorner", function() {
            draggable.prepareDrag(e);
            
            expect(draggable.offsetToCorner).toBeDefined();
        });
    });
    
    describe("onStart", function() {
        beforeEach(function() {
            e = {
                pageX: 0,
                pageY: 0
            };
            
            draggable = createDraggable();
        });
        
        it("should add the draggingCls to el", function() {
            expect(draggable.el.hasCls(draggable.draggingCls)).toBeFalsy();
            
            draggable.onStart(e);
            
            expect(draggable.el.hasCls(draggable.draggingCls)).toBeTruthy();
        });
        
        it("should set dragging = true", function() {
            expect(draggable.isDragging()).toBeFalsy();
            
            draggable.onStart(e);
            
            expect(draggable.isDragging()).toBeTruthy();
        });
        
        it("should fire a dragstart event", function() {
            var fired = false;
            
            draggable.on({
                dragstart: function() { fired = true; }
            });
            
            draggable.onStart(e);
            
            expect(fired).toBeTruthy();
        });
    });

    // TODO simulate more dragging scenarios here, the API has changed significantly
});
