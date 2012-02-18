describe("Ext.gesture.Drag", function() {
    var manager = Ext.gesture.Manager,
        gesture, spy, 
        listener = {fire: function() {}};
    
    describe("events", function() {    
        describe("dragstart", function() {
            beforeEach(function() {
                spy = spyOn(listener, 'fire');
                manager.addEventListener(document.body, 'dragstart', listener.fire, {
                    dragThreshold: 10,
                    direction: 'vertical'
                });
                
                eventSimulator.fire('mousedown', document.body, {
                    pageX: 10,
                    pageY: 10
                });
            });

            afterEach(function() {
                eventSimulator.fire('mouseup', document.body, {});
                manager.removeEventListener(document.body, 'dragstart', listener.fire);
            });   
                     
            it("should not fire when moved less then dragThreshold", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 10,
                        pageY: 16
                    });                
                });

                waits(5);

                runs(function() {
                    expect(spy).wasNotCalled();
                });
            });
            
            it("should not fire when moved horizontally", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 25,
                        pageY: 10
                    });                
                });

                waits(5);

                runs(function() {
                    expect(spy).wasNotCalled();
                });
            });
            
            it("should not fire when moved more then dragThreshold", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 10,
                        pageY: 25
                    });                
                });

                waits(5);

                runs(function() {
                    expect(spy).wasCalled();
                });
            });
        });
        
        describe("drag", function() {
            beforeEach(function() {
                spy = spyOn(listener, 'fire');
                manager.addEventListener(document.body, 'drag', listener.fire, {
                    dragThreshold: 10,
                    direction: 'horizontal'
                });
                
                eventSimulator.fire('mousedown', document.body, {
                    pageX: 10,
                    pageY: 10
                });
            });

            afterEach(function() {
                eventSimulator.fire('mouseup', document.body, {});
                manager.removeEventListener(document.body, 'drag', listener.fire);
            });   
                     
            it("should not fire when moved less then dragThreshold", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 16,
                        pageY: 10
                    });                
                });

                waits(5);

                runs(function() {
                    expect(spy).wasNotCalled();
                });
            });
            
            it("should not fire when moved vertically", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 10,
                        pageY: 25
                    });                
                });

                waits(5);

                runs(function() {
                    expect(spy).wasNotCalled();
                });
            });
            
            it("should fire when moved more then dragThreshold", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 25,
                        pageY: 10
                    });        
                });

                waits(5);

                runs(function() {
                    expect(spy).wasCalled();
                });
            });
            
            it("should fire more then once when firing multiple mousemoves", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 25,
                        pageY: 10
                    });
                    
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 27,
                        pageY: 10
                    }); 
                });

                waits(5);

                runs(function() {
                    expect(spy.callCount).toEqual(2);
                });
            });
            
            it("should fire more then once when moving horizontally then vertically", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 25,
                        pageY: 10
                    });
                    
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 25,
                        pageY: 15
                    }); 
                });

                waits(5);

                runs(function() {
                    expect(spy.callCount).toEqual(2);
                });
            });
        });
        
        describe("dragend", function() {
            beforeEach(function() {
                spy = spyOn(listener, 'fire');
                manager.addEventListener(document.body, 'dragend', listener.fire, {
                    dragThreshold: 10
                });
                
                eventSimulator.fire('mousedown', document.body, {
                    pageX: 10,
                    pageY: 10
                });
            });

            afterEach(function() {
                manager.removeEventListener(document.body, 'dragend', listener.fire);
            });   
                     
            it("should not fire when moved less then dragThreshold", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 16,
                        pageY: 16
                    });
                    
                    eventSimulator.fire('mouseup', document.body, {
                        pageX: 16,
                        pageY: 16
                    });           
                });

                waits(5);

                runs(function() {
                    expect(spy).wasNotCalled();
                });
            });
            
            it("should fire when moved more then dragThreshold", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 25,
                        pageY: 25
                    });  
                    
                    eventSimulator.fire('mouseup', document.body, {
                        pageX: 25,
                        pageY: 25                        
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