describe("Ext.gesture.Manager", function() {
    var manager = Ext.gesture.Manager,
        startSpy, moveSpy, endSpy;
    
    describe("listeners", function() {
        it("should fire touchstart", function() {
            runs(function() {
                eventSimulator.fire('mousedown', document.body, {
                    pageX: 5,
                    pageY: 5
                });            
            });
        
            waits(10);
        
            runs(function() {
                expect(manager.startEvent).toBeDefined();
            });            
        });

        it("should fire touchmove", function() {
            runs(function() {
                eventSimulator.fire('mousemove', document.body, {
                    pageX: 10,
                    pageY: 10
                });            
            });
        
            waits(10);
        
            runs(function() {
                expect(manager.lastMovePoint).toBeDefined();
            });            
        });

        it("should fire touchend", function() {
            runs(function() {
                eventSimulator.fire('mouseup', document.body, {
                });            
            });
        
            waits(10);
        
            runs(function() {
                expect(manager.startEvent).toBeNull();
                expect(manager.lastMovePoint).toBeNull();
            });            
        });
    });
});