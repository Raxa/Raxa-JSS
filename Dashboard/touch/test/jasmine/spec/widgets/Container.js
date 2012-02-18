describe("Ext.Container", function() {
    var container;
    
    beforeEach(function() {
        container = new Ext.Container({
            renderTo: Ext.getBody()
        });
    });
    
    afterEach(function() {
        container.destroy();
    });
    
    it("should have no cardSwitchAnimation by default", function() {
        expect(container.cardSwitchAnimation).toBeNull();
    });
    
    it("should not return the activeItem", function() {
        expect(container.getActiveItem()).toBeNull();
    });
    
    describe("when rendered", function() {
        beforeEach(function() {
            container.destroy();
        });
        
        it("should setCentered", function() {
            container = new Ext.Container({
                floating: true,
                centered: true
            });
            
            spyOn(container, "setCentered");
            
            container.show();
            
            expect(container.setCentered).wasCalledWith(true, true);
        });
    });
    
    describe("when there is a layout", function() {
        beforeEach(function() {
            container.destroy();
            container = new Ext.Container({
                layout  : 'card',
                renderTo: Ext.getBody(),
                
                items: [
                    {
                        html: 'panel1'
                    },
                    {
                        html: 'panel2'
                    }
                ]
            });
        });
        
        it("it should return the active item", function() {
            expect(container.getActiveItem()).not.toBeNull();
            expect(container.getActiveItem().initialConfig.html).toEqual('panel1');
        });
        
        it("should change the card", function() {
            expect(container.getActiveItem().initialConfig.html).toEqual('panel1');
            
            container.setActiveItem(1);
            
            expect(container.getActiveItem().initialConfig.html).toEqual('panel2');
        });
        
        it("should fire a beforecardswitch event", function() {
            var fired = false;
            
            container.on({
                beforecardswitch: function() {
                    fired = true;
                }
            });
            
            container.setActiveItem(1);
            
            expect(fired).toBeTruthy();
        });
        
        it("should fire a cardswitch event", function() {
            var fired = false;
            
            container.on({
                cardswitch: function() {
                    fired = true;
                }
            });
            
            container.setActiveItem(1);
            
            expect(fired).toBeTruthy();
        });
    });
});