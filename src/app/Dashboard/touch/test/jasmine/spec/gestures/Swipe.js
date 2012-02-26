describe("Ext.gesture.Swipe", function() {
    var manager = Ext.gesture.Manager,
        gesture, spy,
        listener = {fire: function() {}};

    describe("events", function() {

        describe("swipe", function() {

            beforeEach(function() {
                spy = spyOn(listener, 'fire');
                manager.addEventListener(document.body, 'swipe', listener.fire, {
                    swipeThreshold: 35,
                    swipeTime: 100
                });

                eventSimulator.fire('mousedown', document.body, {
                    pageX: 100,
                    pageY: 50
                });
            });

            afterEach(function() {
                manager.removeEventListener(document.body, 'swipe', listener.fire);
            });

            it("should fire when moved (to the right) more than swipeThreshold", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 100 + 50,
                        pageY: 50
                    });
                });

                waits(5);

                runs(function() {
                    expect(spy).wasCalled();
                });
            });

            it("should not fire when moved (to the right) less than swipeThreshold", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 100 + 10,
                        pageY: 50
                    });
                });

                waits(5);

                runs(function() {
                    expect(spy).wasNotCalled();
                });
            });

            it("should fire when moved (to the left) more than swipeThreshold", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 100 - 50,
                        pageY: 50
                    });
                });

                waits(5);

                runs(function() {
                    expect(spy).wasCalled();
                });
            });

            it("should not fire when moved (to the left) less than swipeThreshold", function() {
                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 100 - 10,
                        pageY: 50
                    });
                });

                waits(5);

                runs(function() {
                    expect(spy).wasNotCalled();
                });
            });

            it("should not fire when moved after the swipeTime", function() {

                waits(300);

                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 100 - 50,
                        pageY: 50
                    });
                });

                waits(10);

                runs(function() {
                    expect(spy).wasNotCalled();
                });
            });

            it("should fire when moved before swipeTime", function() {

                waits(10);

                runs(function() {
                    eventSimulator.fire('mousemove', document.body, {
                        pageX: 100 - 50,
                        pageY: 50
                    });
                });

                waits(10);

                runs(function() {
                    expect(spy).wasCalled();
                });
            });




        });

    });
});
