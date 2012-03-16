describe("Ext.gesture.Touch", function() {
    var manager = Ext.gesture.Manager,
        gesture, spy, 
        listener = {fire: function() {}};
    
    describe("events", function() {    
        describe("touchstart", function() {
            beforeEach(function() {
                spy = spyOn(listener, 'fire');
                manager.addEventListener(document.body, 'touchstart', listener.fire);
            });

            afterEach(function() {
                manager.removeEventListener(document.body, 'touchstart', listener.fire);
            });   
                     
            it("should fire", function() {
                runs(function() {
                    eventSimulator.fire('mousedown', document.body, {
                        pageX: 10,
                        pageY: 10
                    });                
                });

                waits(5);

                runs(function() {
                    expect(spy).wasCalled();
                });
            });
            
            it("should have coordinates", function() {
                // runs(function() {
                //     eventSimulator.fire('mousedown', document.body, {
                //         pageX: 10,
                //         pageY: 10
                //     });                
                // });
                // 
                // waits(5);
                // 
                // runs(function() {
                //     expect(spy).wasCalled();
                // });
            });
        });

        describe("touchmove", function() {
            beforeEach(function() {
                spy = spyOn(listener, 'fire');
                manager.addEventListener(document.body, 'touchmove', listener.fire);
                
                eventSimulator.fire('mousedown', document.body, {
                    pageX: 10,
                    pageY: 10
                });
            });

            afterEach(function() {
                manager.removeEventListener(document.body, 'touchmove', listener.fire);
            });
            
            it("should fire", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 15,
                        pageY: 15
                    });
                });
            
                waits(5);
            
                runs(function() {
                    expect(spy).wasCalled();
                });
            });
        });
        
        describe("touchend", function() {
            beforeEach(function() {
                spy = spyOn(listener, 'fire');
                manager.addEventListener(document.body, 'touchend', listener.fire);
                
                eventSimulator.fire('mousedown', document.body, {
                    pageX: 10,
                    pageY: 10
                });
            });

            afterEach(function() {
                manager.removeEventListener(document.body, 'touchend', listener.fire);
            });
            
            it("should fire touchend", function() {
                runs(function() {
                    eventSimulator.fire('mouseup', document.body, {
                    });
                });

                waits(5);

                runs(function() {
                    expect(spy).wasCalled();
                });
            });
        });
    });
});