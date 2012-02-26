xdescribe("Ext.util.Droppable", function() {
    var createDroppable, droppable, btn, e, panel,
        proto  = Ext.util.Droppable.prototype,
        called = false;
    
    beforeEach(function() {
        btn = new Ext.Button({
            text    : 'Button',
            renderTo: Ext.getBody()
        });
        
        createDroppable = function(config) {
            return new Ext.util.Droppable(btn.el, config || {});
        };
    });
    
    afterEach(function() {
        e = {};
        called = false;
        
        btn.destroy();
        if (droppable && droppable.destroy) droppable.destroy();
    });
    
    it("should have a baseCls", function() {
        expect(proto.baseCls).toEqual('x-droppable');
    });
    
    it("should have an activeCls", function() {
        expect(proto.activeCls).toEqual('x-drop-active');
    });
    
    it("should have an invalidCls", function() {
        expect(proto.invalidCls).toEqual('x-drop-invalid');
    });
    
    it("should have a hoverCls", function() {
        expect(proto.hoverCls).toEqual('x-drop-hover');
    });
    
    it("should have a validDropMode", function() {
        expect(proto.validDropMode).toEqual('intersect');
    });
    
    it("should not be disabled", function() {
        expect(proto.disabled).toBeFalsy();
    });
    
    it("should have a group", function() {
        expect(proto.group).toEqual('base');
    });
    
    it("should not have tolerance", function() {
        expect(proto.tolerance).toBeNull();
    });
    
    describe("constructor", function() {
        it("should set the el", function() {
            droppable = createDroppable();
            
            console.log(droppable.mgr);
            
            expect(droppable.el).toEqual(btn.el);
        });
        
        it("should add the baseCls to the el", function() {
            expect(btn.el.hasCls(proto.baseCls)).toBeFalsy();
            
            droppable = createDroppable();
            
            expect(droppable.el.hasCls(droppable.baseCls)).toBeTruthy();
            expect(btn.el.hasCls(droppable.baseCls)).toBeTruthy();
        });
    });
});