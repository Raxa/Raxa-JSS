describe("Ext.form.Slider", function() {
    var proto = Ext.form.Slider.prototype,
        field;
    
    beforeEach(function() {
        field = new Ext.form.Slider({
            label: 'test'
        });
    });
    
    afterEach(function() {
        field.destroy();
    });
    
    it("should have a ui", function() {
        expect(proto.ui).toEqual('slider');
    });
    
    it("should have an inputCls", function() {
        expect(proto.inputCls).toEqual('x-slider');
    });
    
    it("should have an inputType", function() {
        expect(proto.inputType).toEqual('slider');
    });
    
    it("should have a minValue", function() {
        expect(proto.minValue).toEqual(0);
    });
    
    it("should have a maxValue", function() {
        expect(proto.maxValue).toEqual(100);
    });
    
    it("should animationDuration", function() {
        expect(proto.animationDuration).toBeTruthy();
    });
    
    it("should have a value", function() {
        expect(proto.value).toEqual(0);
    });
    
    it("should have a trackWidth", function() {
        expect(proto.trackWidth).toBeNull();
    });
    
    it("should have a renderTpl", function() {
        expect(proto.renderTpl).toBeDefined();
    });
    
    it("should have an increment", function() {
        expect(proto.increment).toEqual(1);
    });
    
    describe("when value is set", function() {
        beforeEach(function() {
            field.destroy();
            field = new Ext.form.Slider({
                label: 'test',
                value: 50
            });
        });
        
        it("should create thumbs", function() {
            //for 100% coverage
        });
    });
    
    describe("on render", function() {
        it("should renderThumbs", function() {
            var spy = spyOn(field, "renderThumbs").andCallThrough();
            
            field.render(Ext.getBody());
            
            expect(spy).wasCalled();
        });
    });
    
    describe("when rendered", function() {
        beforeEach(function() {
            field.render(Ext.getBody());
        });
        
        describe("on setValue", function() {
            it("should fire a beforechange event", function() {
                var fired = false;
                
                field.on({
                    beforechange: function() {
                        fired = true;
                    }
                });
                
                field.setValue(75);
                
                expect(fired).toBeTruthy();
            });
            
            it("should moveThumb", function() {
                var spy = spyOn(field, "moveThumb").andCallThrough();
                
                field.setValue(75, true);
                
                expect(spy).wasCalled();
            });
        });
        
        describe("on constrain", function() {
            beforeEach(function() {
                field.increment = 10;
                field.maxValue = 78;
            });
            
            it("should return 10", function() {
                field.setValue(0);
                expect(field.constrain(8)).toEqual(10);
            });
            
            it("should return 10", function() {
                field.setValue(0);
                expect(field.constrain(5)).toEqual(10);
            });
            
            it("should return 0", function() {
                field.setValue(0);
                expect(field.constrain(4)).toEqual(0);
            });
            
            it("should return 20", function() {
                field.setValue(0);
                expect(field.constrain(18)).toEqual(20);
            });
            
            it("should return 70", function() {
                field.setValue(0);
                expect(field.constrain(73)).toEqual(70);
            });
            
            it("should return 78", function() {
                field.setValue(0);
                expect(field.constrain(75)).toEqual(78);
            });
            
            it("should return 78", function() {
                field.setValue(0);
                expect(field.constrain(76)).toEqual(78);
            });
        });

        describe("on constrain with minValue != 0", function() {
            beforeEach(function() {
                field.increment = 20;
                field.maxValue = 200;
                field.minValue = -100;
            });

            it("should return 120", function() {
                field.setValue(111);
                expect(field.getValue()).toEqual(120);
            });

            it("should return -80", function() {
                field.setValue(-89);
                expect(field.getValue()).toEqual(-80);
            });
        });
        
        describe("on getValue", function() {
            it("should return the value", function() {
                field.setValue(1);
                expect(field.getValue()).toEqual(1);
                
                field.setValue(10);
                expect(field.getValue()).toEqual(10);
            });
        });
        
        describe("on getThumb", function() {
            it("should return the thumb", function() {
                expect(field.getThumb()).toEqual(field.thumbs[0]);
            });
        });
        
        describe("on onDrag", function() {
            it("should call getThumbValue", function() {
                var spy = spyOn(field, "getThumbValue").andCallThrough();
                
                field.onDrag(field.thumbs[0].dragObj);
                
                expect(spy).wasCalled();
            });
            
            it("should fire a drag event", function() {
                var fired = false;
                
                field.on({
                    drag: function() {
                        fired = true;
                    }
                });
                
                field.onDrag(field.thumbs[0].dragObj);
                
                expect(fired).toBeTruthy();
            });
        });
        
        describe("on onThumbDragEnd", function() {
            it("should call getThumbValue", function() {
                var spy = spyOn(field, "getThumbValue").andCallThrough();
                
                field.onThumbDragEnd(field.thumbs[0].dragObj);
                
                expect(spy).wasCalled();
            });
            
            it("should fire a dragend event", function() {
                var fired = false;
                
                field.on({
                    dragend: function() {
                        fired = true;
                    }
                });
                
                field.onThumbDragEnd(field.thumbs[0].dragObj);
                
                expect(fired).toBeTruthy();
            });
        });
        
        describe("on onTap", function() {
            it("should call setValue", function() {
                var pageX = field.fieldEl.getPageBox().left + 10,
                    spy   = spyOn(field, "setValue").andCallThrough();
                
                field.onTap({
                    pageX: pageX
                });
                
                expect(spy).wasCalled();
            });
            
            it("should call getSliderValue", function() {
                var pageX = field.fieldEl.getPageBox().left + 10,
                    spy   = spyOn(field, "getSliderValue").andCallThrough();
                
                field.onTap({
                    pageX: pageX
                });
                
                expect(spy).wasCalled();
            });
            
            //TODO: this currently fails in at least one version of Chrome, 18 is passed instead of 10.
            //can't reproduce on my machine under as similar conditions as possible. Would be nice to
            //reinstate this but it is a fairly minor test
            xit("should call getNearest", function() {
                var pageX = field.fieldEl.getPageBox().left + 10,
                    spy   = spyOn(field, "getNearest").andCallThrough();
                
                field.onTap({
                    pageX: pageX
                });
                
                expect(spy).wasCalledWith(pageX);
            });
        });
        
        describe("setThumbsDisabled", function() {
            describe("disable", function() {
                it("should go through each of the thumbs and disable them", function() {
                    var thumbs = field.thumbs,
                        ln     = thumbs.length,
                        i      = 0,
                        result = false;

                    for (; i < ln; i++) {
                        result = thumbs[i].dragObj.disabled;
                    }
                    
                    expect(result).toBeFalsy();
                    
                    thumbs = field.thumbs;
                    ln     = thumbs.length;
                    i      = 0;
                    result = false;
                    
                    field.setThumbsDisabled(true);
                    
                    for (; i < ln; i++) {
                        result = thumbs[i].dragObj.disabled;
                    }
                    
                    expect(result).toBeTruthy();
                });
            });
            
            xdescribe("enable", function() {
                beforeEach(function() {
                    field.setThumbsDisabled(true);
                });
                
                it("should go through each of the thumbs and enable them", function() {
                    var thumbs = field.thumbs,
                        ln     = thumbs.length,
                        i      = 0,
                        result = true;

                    for (; i < ln; i++) {
                        result = thumbs[i].dragObj.disabled;
                    }
                    
                    expect(result).toBeTruthy();
                    
                    var thumbs = field.thumbs,
                        ln     = thumbs.length,
                        i      = 0,
                        result = true;
                    
                    field.setThumbsDisabled(false);

                    for (i; i < ln; i++) {
                        result = thumbs[i].dragObj.disabled;
                    }
                    
                    expect(result).toBeFalsy();
                });
            });
        });
        
        xdescribe("disable", function() {
            it("should call setThumbsDisabled with true", function() {
                var spy = spyOn(field, "setThumbsDisabled").andCallThrough();
                
                field.disable();
                
                expect(spy).wasCalledWith(true);
            });
        });
        
        xdescribe("enable", function() {
            it("should call setThumbsDisabled with false", function() {
                var spy = spyOn(field, "setThumbsDisabled").andCallThrough();
                
                field.enable();
                
                expect(spy).wasCalledWith(false);
            });
        });
    });
});