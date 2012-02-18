describe("Ext.SegmentedButton", function() {
    var sb;
    
    beforeEach(function() {
        sb = new Ext.SegmentedButton({
            items: [
                {
                    text: 'Option 1',
                    pressed: true
                },
                {
                    text: 'Option 2',
                    id  : 'my-button'
                },
                {
                    text: 'Option 3'
                }
            ],
            renderTo: Ext.getBody()
        });
    });
    
    afterEach(function() {
        sb.destroy();
    });
    
    it("should have a defaultType", function() {
        expect(sb.defaultType).toEqual('button');
    });
    
    it("should have a componentCls", function() {
        expect(sb.componentCls).toEqual('x-segmentedbutton');
    });
    
    it("should have a pressedCls", function() {
        expect(sb.pressedCls).toEqual('x-button-pressed');
    });
    
    it("should not allowMultiple", function() {
        expect(sb.allowMultiple).toBeFalsy();
    });
    
    it("should getPressed", function() {
        expect(sb.getPressed()).toEqual(sb.items.get(0));
        sb.setPressed(1);
        expect(sb.getPressed()).toEqual(sb.items.get(1));
    });
    
    describe("when setPressed", function() {
        it("should work using number", function() {
            expect(sb.getPressed()).toEqual(sb.items.get(0));
            expect(sb.pressedButton).toEqual(sb.items.get(0));

            sb.setPressed(1);

            expect(sb.getPressed()).toEqual(sb.items.get(1));
            expect(sb.pressedButton).toEqual(sb.items.get(1));
        });
        
        it("should work using id", function() {
            expect(sb.getPressed()).toEqual(sb.items.get(0));
            expect(sb.pressedButton).toEqual(sb.items.get(0));

            sb.setPressed('my-button');

            expect(sb.getPressed()).toEqual(sb.items.get(1));
            expect(sb.pressedButton).toEqual(sb.items.get(1));
        });
        
        it("should not work", function() {
            var panel = new Ext.Panel({});
            
            expect(sb.getPressed()).toEqual(sb.items.get(0));
            expect(sb.pressedButton).toEqual(sb.items.get(0));

            sb.setPressed(panel);
            
            expect(sb.getPressed()).toBeNull();
            expect(sb.pressedButton).toBeNull();
        });
        
        describe("when allowMultiple", function() {
            beforeEach(function() {
                sb.destroy();
                sb = new Ext.SegmentedButton({
                    allowMultiple: true,
                    items: [
                        {
                            text: 'Option 1'
                        },
                        {
                            text: 'Option 2',
                            id  : 'my-button'
                        },
                        {
                            text: 'Option 3'
                        }
                    ],
                    renderTo: Ext.getBody()
                });
            });
            
            it("should work using number", function() {
                sb.setPressed(1);
                expect(sb.pressedButtons).toEqual([sb.items.get(1)]);
            });

            it("should work using id", function() {
                sb.setPressed('my-button');
                expect(sb.pressedButtons).toEqual([sb.items.get(1)]);
            });

            it("should not work", function() {
                var panel = new Ext.Panel({});
                sb.setPressed(panel);
                expect(sb.pressedButtons).toEqual([]);
            });
        });
    });
    
    describe("when onTap", function() {
        it("should call setPressed", function() {
            var spy = spyOn(sb, "setPressed"),
                btn = sb.items.get(1);
            
            sb.onTap({
                getTarget: function() {
                    return btn;
                }
            });
            
            expect(spy).wasCalled();
        });
    });
    
    describe("when disabled", function() {
        it("should disable the segmentedbutton", function() {
            expect(sb.disabled).toBeFalsy();
            sb.disable();
            expect(sb.disabled).toBeTruthy();
        });
        
        it("should disable all buttons", function() {
            var disabled = true;
            
            sb.disable();
            
            sb.items.each(function(item) {
                disabled = item.disabled;
            });
            
            expect(disabled).toBeTruthy();
        });
    });
    
    describe("when enabled", function() {
        beforeEach(function() {
            sb.disable();
        });
        
        it("should enable the segmentedbutton", function() {
            expect(sb.disabled).toBeTruthy();
            
            sb.enable();
            
            expect(sb.disabled).toBeFalsy();
        });
        
        it("should enable all buttons", function() {
            var disabled = false;
            
            sb.enable();
            
            sb.items.each(function(item) {
                disabled = item.disabled;
            });
            
            expect(disabled).toBeFalsy();
        });
    });
});