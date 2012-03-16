describe("Ext.Carousel", function() {
    var proto = Ext.Carousel.prototype,
        makeCarousel,
        carousel,
        card, card1, card2, card3, card4, card5, card6, e;
    
    beforeEach(function() {
        makeCarousel = function(config) {
            carousel = new Ext.Carousel(Ext.apply({
                renderTo: Ext.getBody(),
    
                items: [
                    {html: 'panel1'},
                    {html: 'panel2'},
                    {html: 'panel3'},
                    {html: 'panel4'},
                    {html: 'panel5'},
                    {html: 'panel6'}
                ]
            }, config));
            
            card1 = carousel.items.get(0);
            card2 = carousel.items.get(1);
            card3 = carousel.items.get(2);
            card4 = carousel.items.get(3);
            card5 = carousel.items.get(4);
            card6 = carousel.items.get(5);
        };
    });
    
    afterEach(function() {
        if (carousel) carousel.destroy();
        card1 = card2 = card3 = card4 = card5 = card6 = null;
    });
    
    it("should have a baseCls", function() {
        expect(proto.baseCls).toEqual('x-carousel');
    });
    
    it("should have an indicator by default", function() {
        expect(proto.indicator).toBeTruthy();
    });
    
    it("should have no ui by default", function() {
        expect(proto.ui).toEqual('dark');
    });
    
    it("should have a horizontal direction by default", function() {
        expect(proto.direction).toEqual('horizontal');
    });
    
    describe("destroy", function(){
        it("should destroy the indicator", function(){
            var start = Ext.ComponentMgr.all.getCount();
            makeCarousel();
            carousel.destroy();
            expect(Ext.ComponentMgr.all.getCount()).toEqual(start);
            expect(carousel.indicator.isDestroyed).toBeTruthy();
        }); 
    });
    
    describe("initComponent", function() {
        it("should create the layout", function() {
            makeCarousel();
            
            expect(carousel.layout).toBeDefined();
            expect(carousel.layout.type).toEqual('card');
            expect(carousel.layout.sizeAllCards).toBeTruthy();
            expect(carousel.layout.hideInactive).toBeFalsy();
        });
        
        describe("when indicator", function() {
            it("should create the indicator", function() {
                expect(proto.indicator).toBeTruthy();
                expect(Ext.isBoolean(proto.indicator)).toBeTruthy();
                expect(proto.indicator.isComponent).toBeFalsy();
                
                makeCarousel();
                
                expect(Ext.isObject(carousel.indicator)).toBeTruthy();
                expect(carousel.indicator.isComponent).toBeTruthy();
            });
        });
        
        describe("when no indicator", function() {
            it("should not create an indicator", function() {
                makeCarousel({
                    indicator: false
                });
                
                expect(Ext.isObject(carousel.indicator)).toBeFalsy();
                expect(carousel.indicator.isComponent).toBeFalsy();
            });
        });
    });
    
    describe("afterLayout", function() {
        beforeEach(function() {
            makeCarousel();
        });
        
        it("should set currentSize", function() {
            expect(carousel.currentSize).toEqual(carousel.body.getSize());
        });
        
        it("should set currentScroll", function() {
            expect(carousel.currentScroll).toEqual({x: 0, y: 0});
        });
        
        it("should set an activeItem", function() {
            expect(carousel.getActiveItem()).toBeDefined();
        });
    });
    
    describe("getCardOffset", function() {
        beforeEach(function() {
            makeCarousel();
        });
        
        it("should return card offset", function() {
            //activeCard == 0/card1
            
            expect(carousel.getCardIndexOffset(card1)).toEqual(0);
            expect(carousel.getCardIndexOffset(card2)).toEqual(1);
            expect(carousel.getCardIndexOffset(card3)).toEqual(2);
            expect(carousel.getCardIndexOffset(card4)).toEqual(3);
            expect(carousel.getCardIndexOffset(card5)).toEqual(4);
            expect(carousel.getCardIndexOffset(card6)).toEqual(5);
            
            carousel.setActiveItem(card5);
            
            expect(carousel.getCardIndexOffset(card1)).toEqual(-4);
            expect(carousel.getCardIndexOffset(card2)).toEqual(-3);
            expect(carousel.getCardIndexOffset(card3)).toEqual(-2);
            expect(carousel.getCardIndexOffset(card4)).toEqual(-1);
            expect(carousel.getCardIndexOffset(card5)).toEqual(0);
            expect(carousel.getCardIndexOffset(card6)).toEqual(1);
        });
    });
    
    describe("getCardIndexOffset", function() {
        beforeEach(function() {
            makeCarousel();
        });
        
        it("should return the difference between the current index and the specified card", function() {
            expect(carousel.getCardIndexOffset(card1)).toEqual(0);
            expect(carousel.getCardIndexOffset(card2)).toEqual(1);
            expect(carousel.getCardIndexOffset(card3)).toEqual(2);
            expect(carousel.getCardIndexOffset(card4)).toEqual(3);
            expect(carousel.getCardIndexOffset(card5)).toEqual(4);
            expect(carousel.getCardIndexOffset(card6)).toEqual(5);
            
            carousel.setActiveItem(4);
            
            expect(carousel.getCardIndexOffset(card1)).toEqual(-4);
            expect(carousel.getCardIndexOffset(card2)).toEqual(-3);
            expect(carousel.getCardIndexOffset(card3)).toEqual(-2);
            expect(carousel.getCardIndexOffset(card4)).toEqual(-1);
            expect(carousel.getCardIndexOffset(card5)).toEqual(0);
            expect(carousel.getCardIndexOffset(card6)).toEqual(1);
        });
    });
    
    describe("isCardInRange", function() {
        beforeEach(function() {
            makeCarousel();
        });
        
        it("should return if the card is in range (within 2)", function() {
            expect(carousel.isCardInRange(card1)).toBeTruthy();
            expect(carousel.isCardInRange(card2)).toBeTruthy();
            expect(carousel.isCardInRange(card3)).toBeTruthy();
            expect(carousel.isCardInRange(card4)).toBeFalsy();
            expect(carousel.isCardInRange(card5)).toBeFalsy();
            expect(carousel.isCardInRange(card6)).toBeFalsy();

            carousel.setActiveItem(card5);

            expect(carousel.isCardInRange(card1)).toBeFalsy();
            expect(carousel.isCardInRange(card2)).toBeFalsy();
            expect(carousel.isCardInRange(card3)).toBeTruthy();
            expect(carousel.isCardInRange(card4)).toBeTruthy();
            expect(carousel.isCardInRange(card5)).toBeTruthy();
            expect(carousel.isCardInRange(card6)).toBeTruthy();
        });
    });
    
    describe("getActiveIndex", function() {
        beforeEach(function() {
            makeCarousel();
        });
        
        it("should return the current active card index", function() {
            expect(carousel.getActiveIndex()).toEqual(0);
        
            carousel.setActiveItem(card5);
        
            expect(carousel.getActiveIndex()).toEqual(4);
        });
    });
    
    describe("scrollToCard", function() {
        beforeEach(function() {
            makeCarousel();
        });
        
        it("should set the oldCard to the current active item", function() {
            expect(carousel.oldCard).not.toBeDefined();
            
            carousel.scrollToCard(card2);
            
            expect(carousel.oldCard).toEqual(card1);
        });
        
        it("should update the layout.activeItem", function() {
            expect(carousel.layout.activeItem).toEqual(card1);
            
            carousel.scrollToCard(card2);
            
            expect(carousel.layout.activeItem).toEqual(card2);
        });
        
        describe("horizontal", function() {
            it("should call getCardOffset", function() {
                var spy = spyOn(carousel, "getCardOffset").andCallThrough();

                carousel.scrollToCard(card2);

                expect(spy).wasCalled();
            });
        });
        
        describe("vertical", function() {
            beforeEach(function() {
                carousel.destroy();
                makeCarousel({
                    direction: 'vertical'
                });
            });
            
            it("should call getCardOffset", function() {
                var spy = spyOn(carousel, "getCardOffset").andCallThrough();

                carousel.scrollToCard(card2);

                expect(spy).wasCalled();
            });
        });
        
        it("should call updateCardPositions", function() {
            var spy = spyOn(carousel, "updateCardPositions").andCallThrough();
            
            carousel.scrollToCard(card2);
            
            expect(spy).wasCalledWith(true);
        });
    });
    
    describe("onTransitionEnd", function() {
        beforeEach(function() {
            makeCarousel();
            carousel.oldCard = card1;
        });
        
        it("should set customScroll to false", function() {
            carousel.onTransitionEnd();
            
            expect(carousel.customScroll).toBeFalsy();
        });
        
        it("should update currentScroll", function() {
            carousel.currentScroll = {x:10, y:500};
            
            carousel.onTransitionEnd();
            
            expect(carousel.currentScroll).toEqual({x:0, y:0});
        });
        
        describe("when oldCard is current card", function() {
            it("should not call onCardSwitch", function() {
                var spy = spyOn(carousel, "onCardSwitch");
                
                carousel.onTransitionEnd();
                
                expect(spy).wasNotCalled();
            });
        });
        
        describe("when oldCard is not current card", function() {
            beforeEach(function() {
                carousel.oldCard = card2;
            });
            
            it("should not call onCardSwitch", function() {
                var spy = spyOn(carousel, "onCardSwitch");
                
                carousel.onTransitionEnd();
                
                expect(spy).wasCalledWith(card1, card2, carousel.items.indexOf(card1), true);
            });
        });
        
        it("should delete oldCard", function() {
            expect(carousel.oldCard).toEqual(card1);
            
            carousel.onTransitionEnd();
            
            expect(carousel.oldCard).not.toBeDefined();
        });
    });
    
    describe("onCardSwitch", function() {
        describe("horizontal", function() {
            beforeEach(function() {
                makeCarousel();
            });
            
            it("should call updateCardPositions", function() {
                var spy = spyOn(carousel, "updateCardPositions").andCallThrough();

                carousel.onCardSwitch(card2, card1, carousel.items.indexOf(card1), true);

                expect(spy).wasCalled();
            });
        });
        
        describe("vertical", function() {
            beforeEach(function() {
                makeCarousel({
                    direction: 'vertical'
                });
            });
            
            it("should call updateCardPositions", function() {
                var spy = spyOn(carousel, "updateCardPositions").andCallThrough();

                carousel.onCardSwitch(card2, card1, carousel.items.indexOf(card1), true);

                expect(spy).wasCalled();
            });
        });
        
        it("should fire the activate event on the newCard", function() {
            makeCarousel();
            
            var fired = false;
            
            card2.on({
                activate: function() {
                    fired = true;
                }
            });
            
            carousel.onCardSwitch(card2, card1, carousel.items.indexOf(card1), true);
            
            expect(fired).toBeTruthy();
        });
    });
    
    describe("next", function() {
        it("should switch to the next card", function() {
            expect(carousel.getActiveItem()).toEqual(card1);

            carousel.next();

            expect(carousel.getActiveItem()).toEqual(card2);
        });
    });
    
    describe("prev", function() {
        beforeEach(function() {
            carousel.next();
        });
        
        it("should switch to the previous card", function() {
            expect(carousel.getActiveItem()).toEqual(card2);

            carousel.prev();

            expect(carousel.getActiveItem()).toEqual(card1);
        });
    });
    
    describe("Ext.Carousel.Indicator", function() {
        var proto = Ext.Carousel.Indicator.prototype,
            indicator;
        
        beforeEach(function() {
            makeCarousel({
                renderTo: null
            });
            
            indicator = carousel.indicator;
        });
        
        it("should have a baseCls", function() {
            expect(proto.baseCls).toEqual('x-carousel-indicator');
        });
        
        describe("initComponent", function() {
            describe("when not rendered", function() {
                it("should listen to the render event on the carousel", function() {
                    expect(carousel.rendered).toBeFalsy();
                    expect(carousel.indicator.rendered).toBeFalsy();
                    
                    carousel.render(Ext.getBody());
                    
                    expect(carousel.rendered).toBeTruthy();
                    expect(carousel.indicator.rendered).toBeTruthy();
                });
            });
            
            describe("when rendered", function() {
                it("should render the carousel", function() {
                    carousel.destroy();
                    
                    makeCarousel();
                    indicator = carousel.indicator;
                    
                    expect(carousel.rendered).toBeTruthy();
                    expect(carousel.indicator.rendered).toBeTruthy();
                });
            });
        });
        
        describe("onRender", function() {
            it("should call createIndicator for each of the cards", function() {
                var spy = spyOn(indicator, "createIndicator").andCallThrough();
                
                carousel.render(Ext.getBody());
                
                expect(spy).wasCalled();
                expect(spy.callCount).toEqual(6);
            });
        });
        
        describe("onTap", function() {
            beforeEach(function() {
                carousel.render(Ext.getBody());
            });
            
            it("should go to the next card", function() {
                spyOn(carousel, "next");
                
                var box     = indicator.el.getPageBox(),
                    centerX = box.left + (box.width / 2),
                    pageX   = centerX + 20;
                
                indicator.onTap({
                    pageX: pageX
                });
                
                expect(carousel.next).wasCalled();
            });
            
            it("should go to the previous card", function() {
                spyOn(carousel, "prev");
                
                var box     = indicator.el.getPageBox(),
                    centerX = box.left + (box.width / 2),
                    pageX   = centerX - 20;
                
                indicator.onTap({
                    pageX: pageX
                });
                
                expect(carousel.prev).wasCalled();
            });
        });
        
        describe("createIndicator", function() {
            beforeEach(function() {
                carousel.render(Ext.getBody());
            });
            
            it("should add an indicator to the indicators property", function() {
                expect(indicator.indicators.length).toEqual(6);
                
                indicator.createIndicator();
                
                expect(indicator.indicators.length).toEqual(7);
            });
        });
        
        describe("onBeforeCardSwitch", function() {
            beforeEach(function() {
                carousel.render(Ext.getBody());
            });
            
            it("should call radioClass on the chosen indicator", function() {
                var index = carousel.items.indexOf(card2),
                    spy = spyOn(indicator.indicators[index], "radioCls").andCallThrough(); 
                
                indicator.onBeforeCardSwitch(carousel, card2, card1, index);
                
                expect(spy).wasCalledWith('x-carousel-indicator-active');
            });
        });
        
        describe("add/remove", function(){
            var withChildren;
            beforeEach(function(){
                carousel.render(Ext.getBody());
                withChildren = new Ext.Carousel({
                    renderTo: document.body,
                    items: [{
                        html: 'a',
                        items: [{
                            html: 'child'
                        }]
                    },{
                        html: 'b'
                    }]
                });
            });
            
            afterEach(function(){
                withChildren.destroy();
                withChildren = null;
            });
            describe("onCardAdd", function(){
                it("should create an indicator", function(){
                    carousel.add({
                        text: 'foo'
                    });
                    expect(indicator.indicators.length).toEqual(7);
                    expect(indicator.el.dom.getElementsByTagName('span').length).toEqual(7);
                });
                
                it("should not alter indicator when creating a grandchild", function(){
                    withChildren.items.last().add({
                        text: 'new'
                    });
                    expect(withChildren.indicator.indicators.length).toEqual(2);
                    expect(withChildren.indicator.el.dom.getElementsByTagName('span').length).toEqual(2);    
                });
            });
            
            describe("onCardRemove", function(){
                it("should remove the last indicator", function(){
                    expect(indicator.indicators.length).toEqual(6);
                    
                    carousel.remove(card6);
                    
                    expect(indicator.indicators.length).toEqual(5);
                    expect(indicator.el.dom.getElementsByTagName('span').length).toEqual(5);
                });
                
                it("should not alter indicator when creating a grandchild", function(){
                    withChildren.items.first().remove(0);
                    expect(withChildren.indicator.indicators.length).toEqual(2);
                    expect(withChildren.indicator.el.dom.getElementsByTagName('span').length).toEqual(2);    
                });
            }); 
        });
    });
});
