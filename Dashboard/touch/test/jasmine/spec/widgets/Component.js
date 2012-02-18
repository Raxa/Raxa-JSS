describe("Ext.Component", function() {
    var proto = Ext.Component.prototype,
        component, componentOld, btn;
    
    beforeEach(function() {
        component = new Ext.Component({
            renderTo: Ext.getBody()
        });
    });
    
    afterEach(function() {
        component.destroy();
    });
    
    it("should not showAnimation by default", function() {
        expect(proto.showAnimation).toBeFalsy();
    });
    
    it("should not monitorOrientation by default", function() {
        expect(proto.monitorOrientation).toBeFalsy();
    });
    
    it("should have a floatingCls", function() {
        expect(proto.floatingCls).toEqual('x-floating');
    });
    
    it("should hideOnMaskTap by default", function() {
        expect(proto.hideOnMaskTap).toBeTruthy();
    });
    
    it("should not be centered by default", function() {
        expect(proto.centered).toBeFalsy();
    });
    
    it("should not be modal by default", function() {
        expect(proto.modal).toBeFalsy();
    });
    
    describe("when it is fullscreen", function() {
        beforeEach(function() {
            componentOld = component;
            component = new Ext.Component({
                fullscreen: true,
                
                renderTo: Ext.getBody()
            });
        });
        
        afterEach(function() {
            component.destroy();
            component = componentOld;
        });
        
        it("should monitorOrientation", function() {
            expect(componentOld.monitorOrientation).toBeFalsy();
            expect(component.monitorOrientation).toBeTruthy();
        });
        
        it("should set a width", function() {
            expect(component.width).toEqual(window.innerWidth);
        });
        
        it("should set a height", function() {
            expect(component.height).toEqual(window.innerHeight);
        });
        
        it("should have a fullscreen class", function() {
            expect(component.el.hasCls('x-fullscreen')).toBeTruthy();
        });
    });
    
    describe("when it is floating", function() {
        beforeEach(function() {
            componentOld = component;
            component = new Ext.Component({
                floating: true,
                
                renderTo: Ext.getBody()
            });
        });
        
        afterEach(function() {
            component.destroy();
            component = componentOld;
        });
        
        it("should monitorOrientation", function() {
            expect(componentOld.monitorOrientation).toBeFalsy();
            expect(component.monitorOrientation).toBeTruthy();
        });
    });
    
    describe("when it is draggable", function() {
        beforeEach(function() {
            component.destroy();
            component = new Ext.Component({
                draggable: true
            });
        });
        
        it("should setDraggable", function() {
            spyOn(component, "setDraggable");
            
            component.render(Ext.getBody());
            
            expect(component.setDraggable).wasCalled();
        });
    });

    describe("when it is horizontal", function() {
        beforeEach(function() {
            component.destroy();
            component = new Ext.Component({
                scroll  : 'horizontal'
            });
        });
        
        it("should afterComponentLayout", function() {
            spyOn(component, "afterComponentLayout").andCallThrough();
            
            component.render(Ext.getBody());
            
            expect(component.afterComponentLayout).wasCalled();
        });
    });
    
    describe("on update", function() {
        it("should run", function() {
            component.update();
        });
        
        describe("when there is a scroller", function() {
            beforeEach(function() {
                component.destroy();
                component = new Ext.Component({
                    scroll: 'horizontal'
                });
            });
            
            it("should run", function() {
                component.update();
            });
        });
    });
    
    describe("on show", function() {
        beforeEach(function() {
            component.hide();
        });
        
        it("should fire an event", function() {
            var fired = false;
            
            component.on({
                show: function() {
                    fired = true;
                }
            });
            
            component.show();
            
            expect(fired).toBeTruthy();
        });
        
        describe("when centered", function() {
            beforeEach(function() {
                component.floating = true;
                component.centered = true;
            });
            
            it("should call setCentered", function() {
                var spy = spyOn(component, "setCentered").andCallThrough();
                
                component.show();
                
                expect(spy).wasCalled();
            });
        });
        
        describe("when there is an anchorEl", function() {
            beforeEach(function() {
                component.anchorEl = new Ext.Button({
                    text    : 'text',
                    renderTo: Ext.getBody()
                });
            });
            
            afterEach(function() {
                component.anchorEl.destroy();
            });
            
            it("should hide the anchorEl", function() {
                var spy = spyOn(component.anchorEl, "hide");
                
                component.show();
                
                expect(spy).wasCalled();
            });
        });
    });
    
    describe("on showBy", function() {
        beforeEach(function() {
            btn = new Ext.Button({
                text    : 'text',
                renderTo: Ext.getBody()
            });
        });
        
        afterEach(function() {
            btn.destroy();
        });
        
        it("should return when it isnt floating", function() {
            component.render(Ext.getBody());
            
            component.showBy(btn);
        });
        
        describe("when floating", function() {
            beforeEach(function() {
                component.floating = true;
            });
            
            it("should continue", function() {
                component.render(Ext.getBody());

                component.showBy(btn.el);
            });
        });
    });
    
    describe("when hiding the component", function() {
        it("should fire an event", function() {
            var fired = false;
            
            component.on({
                hide: function() {
                    fired = true;
                }
            });
            
            component.hide();
            
            expect(fired).toBeTruthy();
        });
    });
    
    it("should allow you to setScrollable", function() {
        expect(component.scroller).not.toBeDefined();
        
        component.setScrollable('auto');
        
        expect(component.scroller).toBeDefined();
    });
    
    describe("when changing orientation", function() {
        it("should fire a beforeorientationchange", function() {
            var fired = false;
            
            component.on({
                beforeorientationchange: function() {
                    fired = true;
                }
            });
            
            component.setOrientation('portrait');
            
            expect(fired).toBeTruthy();
            
            fired = false;
            expect(fired).toBeFalsy();
            
            component.on({
                beforeorientationchange: function() {
                    fired = true;
                }
            });
            
            component.setOrientation('landscape');
            
            expect(fired).toBeTruthy();
        });
        
        it("should fire a orientationchange", function() {
            var fired = false;
            
            component.on({
                orientationchange: function() {
                    fired = true;
                }
            });
            
            component.setOrientation('portrait');
            
            expect(fired).toBeTruthy();
            
            fired = false;
            expect(fired).toBeFalsy();
            
            component.on({
                orientationchange: function() {
                    fired = true;
                }
            });
            
            component.setOrientation('landscape');
            
            expect(fired).toBeTruthy();
        });
        
        it("should add a class", function() {
            expect(component.el.hasCls('x-landscape')).toBeFalsy();
            expect(component.el.hasCls('x-portrait')).toBeFalsy();
            
            component.setOrientation('portrait');
            
            expect(component.el.hasCls('x-landscape')).toBeFalsy();
            expect(component.el.hasCls('x-portrait')).toBeTruthy();
            
            component.setOrientation('landscape');
            
            expect(component.el.hasCls('x-landscape')).toBeTruthy();
            expect(component.el.hasCls('x-portrait')).toBeFalsy();
        });
    });
});