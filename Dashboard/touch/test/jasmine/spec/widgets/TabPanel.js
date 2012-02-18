describe("Ext.TabBar", function() {
    var tb, tab1, tab2, tab3, cards;
    
    beforeEach(function() {
        tb = new Ext.TabBar({
            items: [
                {text: 'One'},
                {text: 'Two'},
                {text: 'Three'}
            ],
            
            renderTo: Ext.getBody()
        });
        
        tab1 = tb.items.get(0);
        tab2 = tb.items.get(1);
        tab3 = tb.items.get(2);
    });
    
    afterEach(function() {
        tb.destroy();
    });
    
    it("should have a componentCls", function() {
        expect(tb.componentCls).toEqual('x-tabbar');
    });
    
    it("should not have an activeTab", function() {
        expect(tb.activeTab).toBeNull();
    });
    
    it("should have a defaultType", function() {
        expect(tb.defaultType).toEqual('tab');
    });
    
    it("should not be sortable", function() {
        expect(tb.sortable).toBeFalsy();
    });
    
    it("should have a sortHoldThreshold", function() {
        expect(tb.sortHoldThreshold).toEqual(350);
    });
    
    describe("when rendered", function() {
        it("should set a layout", function() {
            expect(tb.layout).toBeDefined();
        });
        
        describe("when sortable", function() {
            beforeEach(function() {
                tb.destroy();
                tb = new Ext.TabBar({
                    sortable: true,
                    renderTo: Ext.getBody()
                });
            });
            
            it("should make the tabbar sortable", function() {
                expect(tb.sortable).not.toBeFalsy();
                expect(tb.sortable).toBeDefined();
            });
        });
    });
    
    // describe("when cardLayout", function() {
    //     beforeEach(function() {
    //         cards = new Ext.Panel({
    //             layout: 'card',
    //             
    //             items: [
    //                 {html:'1'},
    //                 {html:'2'}
    //             ],
    //             
    //             renderTo: Ext.getBody()
    //         });
    //         
    //         tb.destroy();
    //         tb = new Ext.TabBar({
    //             cardLayout: cards.layout,
    //             
    //             items: [
    //                 {text: 'One'},
    //                 {text: 'Two'},
    //                 {text: 'Three'}
    //             ]
    //         });
    //     });
    //     
    //     it("should setCardLayout", function() {
    //         spyOn(tb, "setCardLayout").andCallThrough();
    //         
    //         tb.render(Ext.getBody());
    //         
    //         expect(tb.setCardLayout).wasCalled();
    //     });
    // });
    
    describe("when onTabTap", function() {
        it("should change the activeTab", function() {
            expect(tb.activeTab).toBeNull();
            
            tb.onTabTap(tab1);
            
            expect(tb.activeTab).toEqual(tab1);
            expect(tb.activeTab).not.toEqual(tab2);
        });
        
        it("should fire a change event", function() {
            var fired = false;
            
            tb.on({
                change: function() {
                    fired = true;
                }
            });
            
            tb.onTabTap(tab1);
            
            expect(fired).toBeTruthy();
        });
    });
});

describe("Ext.Tab", function() {
    var tab;
    
    beforeEach(function() {
        tab = new Ext.Tab({
            text    : 'Tab',
            renderTo: Ext.getBody()
        });
    });
    
    afterEach(function() {
        tab.destroy();
    });
    
    it("should be a tab", function() {
        expect(tab.isTab).toBeTruthy();
    });
    
    it("should have a baseCls", function() {
        expect(tab.baseCls).toEqual('x-tab');
    });
    
    it("should have a pressedCls", function() {
        expect(tab.pressedCls).toEqual('x-tab-pressed');
    });
    
    it("should have a activeCls", function() {
        expect(tab.activeCls).toEqual('x-tab-active');
    });
    
    describe("on getCard", function() {
        it("should get the card", function() {
            expect(tab.getCard()).not.toBeDefined();
        });
    });
    
    describe("when activated", function() {
        it("should add the activeCls", function() {
            expect(tab.el.hasCls(tab.activeCls)).toBeFalsy();
            
            tab.activate();
            
            expect(tab.el.hasCls(tab.activeCls)).toBeTruthy();
        });
        
        it("should fire the activate event", function() {
            var fired = false;
            
            tab.on({
                activate: function() {
                    fired = true;
                }
            });
            
            tab.activate();
            
            expect(fired).toBeTruthy();
        });
    });
    
    describe("when deactivated", function() {
        beforeEach(function() {
            tab.activate();
        });
        
        it("should remove the activeCls", function() {
            expect(tab.el.hasCls(tab.activeCls)).toBeTruthy();
            
            tab.deactivate();
            
            expect(tab.el.hasCls(tab.activeCls)).toBeFalsy();
        });
        
        it("should fire the deactivate event", function() {
            var fired = false;
            
            tab.on({
                deactivate: function() {
                    fired = true;
                }
            });
            
            tab.deactivate();
            
            expect(fired).toBeTruthy();
        });
    });
});

describe("Ext.TabPanel", function() {
    var tp;
    
    beforeEach(function() {
        tp = new Ext.TabPanel({
            fullscreen: true,
            ui        : 'dark',
            sortable  : true,
            
            items: [
                {
                    title: 'Tab 1',
                    html : '1',
                    cls  : 'card1'
                },
                {
                    title: 'Tab 2',
                    html : '2',
                    cls  : 'card2'
                },
                {
                    title: 'Tab 3',
                    html : '3',
                    cls  : 'card3'
                }
            ],
            
            renderTo: Ext.getBody()
        });
    });
    
    afterEach(function() {
        tp.destroy();
    });
    
    it("should a default slide animation", function() {
        expect(tp.cardSwitchAnimation).toEqual('slide');
    });
    
    it("should have a tabBarDock of top", function() {
        expect(tp.tabBarDock).toEqual('top');
    });
    
    it("should have a componentCls", function() {
        expect(tp.componentCls).toEqual('x-tabpanel');
    });
    
    it("should have a ui", function() {
        expect(tp.ui).toEqual('dark');
    });
    
    describe("when rendered", function() {
        it("should set a layout", function() {
            expect(tp.layout).toBeDefined();
        });
        
        it("should create a tabBar", function() {
            expect(tp.tabBar).toBeDefined();
        });
    });
    
    it("should return the tabBar", function() {
        expect(tp.getTabBar()).toBeDefined();
    });
    
    describe("when tab.setCard", function() {
        it("should update the card", function() {
            var tab = tp.getTabBar().items.get(1);
            
            var newCard = new Ext.Panel({
                html: '4',
                cls : 'card4'
            });
            
            tab.setCard(newCard);
            
            newCard.destroy();
        });
    });
    
    describe("when tp.add", function() {
        it("should add the card", function() {
            expect(tp.items.length).toEqual(3);
            var newCard = new Ext.Panel({
                html: '4',
                cls : 'card4'
            });
            tp.add(newCard);
            expect(tp.items.length).toEqual(4);
        });
    });

    describe("when tp.remove", function() {
        it("should remove the card", function() {
            expect(tp.items.length).toEqual(3);
            var newCard = new Ext.Panel({
                html: '4',
                cls : 'card4'
            });
            tp.add(newCard);
            tp.remove(newCard);
            newCard.destroy();
            expect(tp.items.length).toEqual(3);
        });
    });

    describe("when dockedItems", function() {
        beforeEach(function() {
            tp.destroy();
            tp = new Ext.TabPanel({
                fullscreen: true,
                ui        : 'dark',
                sortable  : true,

                items: [
                    {
                        title: 'Tab 1',
                        html : '1',
                        cls  : 'card1'
                    },
                    {
                        title: 'Tab 2',
                        html : '2',
                        cls  : 'card2'
                    },
                    {
                        title: 'Tab 3',
                        html : '3',
                        cls  : 'card3'
                    }
                ],
                dockedItems: new Ext.Toolbar({
                    xtype: 'toolbar',
                    title: 'docked item',
                    dock : 'bottom'
                })
            });
        });
        
        it("should add the dockedItems", function() {
            // for 100% coverage
            tp.render(Ext.getBody());
        });
    });
    
    describe("when tb.onTabTap", function() {
        it("should call setActiveItem on the cardLayout", function() {
            var tb   = tp.getTabBar(),
                tab1 = tb.items.get(1),
                spy  = spyOn(tb.cardLayout, "setActiveItem").andCallThrough();
            
            tb.onTabTap(tab1);
            
            expect(spy).wasCalled();
        });
    });
});
