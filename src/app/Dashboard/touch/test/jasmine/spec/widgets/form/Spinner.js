describe("Ext.form.Spinner", function() {
    var field;
    
    beforeEach(function() {
        field = new Ext.form.Spinner({
            label: 'test'
        });
    });
    
    afterEach(function() {
        field.destroy();
    });
    
    it("should have a componentCls", function() {
        expect(field.componentCls).toEqual('x-spinner');
    });
    
    it("should have a minValue", function() {
        expect(field.minValue).toEqual(Number.NEGATIVE_INFINITY);
    });
    
    it("should have a maxValue", function() {
        expect(field.maxValue).toEqual(Number.MAX_VALUE);
    });
    
    it("should have a incrementValue", function() {
        expect(field.incrementValue).toEqual(1);
    });
    
    it("should accelerate", function() {
        expect(field.accelerateOnTapHold).toBeTruthy();
    });
    
    it("should have a defaultValue", function() {
        expect(field.defaultValue).toEqual(0);
    });
    
    it("should not cycle", function() {
        expect(field.cycle).toBeFalsy();
    });
    
    it("should not disableInput", function() {
        expect(field.disableInput).toBeFalsy();
    });
    
    it("should have a renderTpl", function() {
        expect(field.renderTpl).toBeDefined();
    });
    
    describe("on render", function() {
        it("should add a downRepeater", function() {
            var spy = spyOn(field, "createRepeater").andCallThrough();
            expect(field.downRepeater).not.toBeDefined();
            
            field.render(Ext.getBody());
            
            expect(spy).wasCalled();
            expect(field.downRepeater).toBeDefined();
        });
        
        it("should add a upRepeater", function() {
            var spy = spyOn(field, "createRepeater").andCallThrough();
            expect(field.upRepeater).not.toBeDefined();
            
            field.render(Ext.getBody());
            
            expect(spy).wasCalled();
            expect(field.upRepeater).toBeDefined();
        });
        
        describe("when onSpinDown", function() {
            beforeEach(function() {
                field.render(Ext.getBody());
            });
            
            it("should spin", function() {
                var spy = spyOn(field, "spin").andCallThrough();
                
                field.onSpinDown();
                
                expect(spy).wasCalledWith(true);
            });
            
            describe("when disabled", function() {
                beforeEach(function() {
                    field.disable();
                });
                
                it("should not spin", function() {
                    var spy = spyOn(field, "spin").andCallThrough();

                    field.onSpinDown();
                    
                    expect(spy).wasNotCalled();
                });
            });
        });
        
        describe("when onSpinUp", function() {
            beforeEach(function() {
                field.render(Ext.getBody());
            });
            
            it("should spin", function() {
                var spy = spyOn(field, "spin").andCallThrough();
                
                field.onSpinUp();
                
                expect(spy).wasCalledWith(false);
            });
            
            describe("when disabled", function() {
                beforeEach(function() {
                    field.disable();
                });
                
                it("should not spin", function() {
                    var spy = spyOn(field, "spin").andCallThrough();

                    field.onSpinUp();
                    
                    expect(spy).wasNotCalled();
                });
            });
        });
        
        describe("when onTouchStart", function() {
            beforeEach(function() {
                field.render(Ext.getBody());
            });
            
            it("should call addCls", function() {
                var btn = field.downRepeater,
                    spy = spyOn(btn.el, "addCls").andCallThrough();
                
                field.onTouchStart(btn);
                
                expect(spy).wasCalledWith('x-button-pressed');
            });
        });
        
        describe("when onTouchEnd", function() {
            beforeEach(function() {
                field.render(Ext.getBody());
            });
            
            it("should call addCls", function() {
                var btn = field.downRepeater,
                    spy = spyOn(btn.el, "removeCls").andCallThrough();
                
                field.onTouchEnd(btn);
                
                expect(spy).wasCalledWith('x-button-pressed');
            });
        });
        
        describe("when spin", function() {
            beforeEach(function() {
                field.render(Ext.getBody());
            });
            
            it("should call setValue", function() {
                var spy = spyOn(field, "setValue").andCallThrough();
                
                field.spin(false);
                field.spin(false);
                
                expect(spy).wasCalledWith(1);
                expect(spy).wasCalledWith(2);
            });
            
            it("should fire a spin event", function() {
                var fired = false;
                
                field.on({
                    spin: function() {
                        fired = true;
                    }
                });
                
                field.spin(false);
                
                expect(fired).toBeTruthy();
            });
            
            it("should fire a spinup event", function() {
                var fired = false;
                
                field.on({
                    spinup: function() {
                        fired = true;
                    }
                });
                
                field.spin(false);
                
                expect(fired).toBeTruthy();
            });
            
            it("should fire a spindown event", function() {
                var fired = false;
                
                field.on({
                    spinup: function() {
                        fired = true;
                    }
                });
                
                field.spin(false);
                field.spin(false);
                field.spin(true);
                
                expect(fired).toBeTruthy();
            });
            
            it("should use min and max values", function() {
                // for 100% coverage
                field.setValue(2);
                field.minValue = 1;
                field.maxValue = 3;
                
                field.spin(true);
                field.spin(true);
                field.spin(true);
                field.spin(false);
                field.spin(false);
                field.spin(false);
            });
        });
        
        describe("when destroy", function() {
            beforeEach(function() {
                field.render(Ext.getBody());
            });
            
            it("should destroy downRepeater and upRepeater", function() {
                var spy = spyOn(Ext, "destroy").andCallThrough();
                
                field.destroy();
                
                expect(spy).wasCalledWith(field.downRepeater, field.upRepeater);
            });
        });
    });
});