describe("Ext.gesture.Tap", function() {
    var manager = Ext.gesture.Manager,
        gesture, spy, 
        listener = {fire: function() {}};
    
    describe("events", function() {    
        describe("tapstart", function() {
            beforeEach(function() {
                spy = spyOn(listener, 'fire');
                manager.addEventListener(document.body, 'tapstart', listener.fire);
            });

            afterEach(function() {
                manager.removeEventListener(document.body, 'tapstart', listener.fire);
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
        });
        
        describe("tap", function() {
            beforeEach(function() {
                spy = spyOn(listener, 'fire');
                manager.addEventListener(document.body, 'tap', listener.fire, {
                    cancelThreshold: 5
                });
                
                eventSimulator.fire('mousedown', document.body, {
                    pageX: 10,
                    pageY: 10
                });
            });

            afterEach(function() {
                manager.removeEventListener(document.body, 'tap', listener.fire);
            });   
                     
            it("should fire", function() {
                runs(function() {
                    eventSimulator.fire('mouseup', document.body, {});                
                });

                waits(5);

                runs(function() {
                    expect(spy).wasCalled();
                });
            });
            
            it("should not fire when moved 5px", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 15,
                        pageY: 15
                    });
                    eventSimulator.fire('mouseup', document.body, {});
                });

                waits(5);

                runs(function() {
                    expect(spy).wasNotCalled();
                });
            });
        });
        
        describe("tapcancel", function() {
            beforeEach(function() {
                spy = spyOn(listener, 'fire');
                manager.addEventListener(document.body, 'tapcancel', listener.fire, {
                    cancelThreshold: 5
                });
                
                eventSimulator.fire('mousedown', document.body, {
                    pageX: 10,
                    pageY: 10
                });
            });

            afterEach(function() {
                manager.removeEventListener(document.body, 'tapcancel', listener.fire);
                eventSimulator.fire('mouseup', document.body, {});
            });   
                     
            it("should fire when moved 5px", function() {
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
            
            it("should not fire when not moved 5px", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 13,
                        pageY: 13
                    });
                });

                waits(5);

                runs(function() {
                    expect(spy).wasNotCalled();
                });
            });
        });
        
        describe("doubletap", function() {
            beforeEach(function() {
                spy = spyOn(listener, 'fire');
                manager.addEventListener(document.body, 'doubletap', listener.fire, {
                    doubleTapThreshold: 500
                });
                
                eventSimulator.fire('mousedown', document.body, {
                    pageX: 10,
                    pageY: 10
                });
            });

            afterEach(function() {
                manager.removeEventListener(document.body, 'doubletap', listener.fire);
            });   
                     
            it("should fire", function() {
                runs(function() {
                    eventSimulator.fire('mouseup', document.body, {});
                    eventSimulator.fire('mousedown', document.body, {
                        pageX: 10,
                        pageY: 10
                    });
                    eventSimulator.fire('mouseup', document.body, {});
                });

                waits(5);

                runs(function() {
                    expect(spy).wasCalled();
                });
            });
            
            it("should not fire when more then doubleTapThreshold", function() {
                runs(function() {
                    eventSimulator.fire('mouseup', document.body, {});
                });

                waits(800);
                
                runs(function() {
                    eventSimulator.fire('mousedown', document.body, {
                        pageX: 10,
                        pageY: 10
                    });
                    eventSimulator.fire('mouseup', document.body, {});
                })

                waits(5);
                
                runs(function() {
                    expect(spy).wasNotCalled();
                });
            });
        });
        
        describe("singletap", function() {
            beforeEach(function() {
                spy = spyOn(listener, 'fire');
                manager.addEventListener(document.body, 'singletap', listener.fire, {
                    singleTapThreshold: 500
                });
                
                eventSimulator.fire('mousedown', document.body, {
                    pageX: 10,
                    pageY: 10
                });
            });

            afterEach(function() {
                manager.removeEventListener(document.body, 'singletap', listener.fire);
            });   
                     
            it("should fire", function() {
                runs(function() {
                    eventSimulator.fire('mouseup', document.body, {});
                });

                waits(5);

                runs(function() {
                    expect(spy).wasCalled();
                });
            });
            
            it("should not fire within 500ms of the last one", function() {
                runs(function() {
                    eventSimulator.fire('mouseup', document.body, {});
                });

                waits(5);

                runs(function() {
                    expect(spy).wasCalled();
                });
                
                waits(100);
                
                runs(function() {
                    eventSimulator.fire('mousedown', document.body, {
                        pageX: 10,
                        pageY: 10
                    });
                    eventSimulator.fire('mouseup', document.body, {});
                });
                
                waits(5);
                
                runs(function() {
                    expect(spy.callCount).toEqual(1);
                });
            });
            
            it("should fire again after more then 500ms", function() {
                runs(function() {
                    eventSimulator.fire('mouseup', document.body, {});
                });

                waits(5);

                runs(function() {
                    expect(spy).wasCalled();
                });
                
                waits(600);
                
                runs(function() {
                    eventSimulator.fire('mousedown', document.body, {
                        pageX: 10,
                        pageY: 10
                    });
                    eventSimulator.fire('mouseup', document.body, {});
                });
                
                waits(5);
                
                runs(function() {
                    expect(spy.callCount).toEqual(2);
                });
            });
        });
        
        describe("taphold", function() {
            beforeEach(function() {
                spy = spyOn(listener, 'fire');
                manager.addEventListener(document.body, 'taphold', listener.fire, {
                    holdThreshold: 100
                });
                
                eventSimulator.fire('mousedown', document.body, {
                    pageX: 10,
                    pageY: 10
                });
            });

            afterEach(function() {
                manager.removeEventListener(document.body, 'taphold', listener.fire);
            });   
                     
            it("should fire", function() {
                waits(200);
                
                runs(function() {
                    eventSimulator.fire('mouseup', document.body, {});                
                });

                waits(5);

                runs(function() {
                    expect(spy).wasCalled();
                });
            });
            
            it("should not fire when released before 100ms", function() {
                runs(function() {
                    eventSimulator.fire('mouseup', document.body, {});                
                });

                waits(5);

                runs(function() {
                    expect(spy).wasNotCalled();
                });
            });
        });
    });
});