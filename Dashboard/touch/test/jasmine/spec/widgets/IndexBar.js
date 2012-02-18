describe("Ext.IndexBar", function() {
    var indexBar, e;
    
    beforeEach(function() {
        indexBar = new Ext.IndexBar({
            renderTo: Ext.getBody()
        });
    });
    
    afterEach(function() {
        indexBar.destroy();
    });
    
    it("should have a componentCls", function() {
        expect(indexBar.componentCls).toEqual('x-indexbar');
    });
    
    it("should have a direction", function() {
        expect(indexBar.direction).toEqual('vertical');
    });
    
    it("should have a template", function() {
        expect(indexBar.tpl).toBeDefined();
    });
    
    it("should have a itemSelector", function() {
        expect(indexBar.itemSelector).toEqual('div.x-indexbar-item');
    });
    
    it("should have letters defined", function() {
        expect(indexBar.letters).toBeDefined();
    });
    
    describe("when initComponent", function() {
        it("should create a store", function() {
            expect(indexBar.store).toBeDefined();
        });
        
        describe("when using the alphabet", function() {
            beforeEach(function() {
                indexBar.destroy();
                indexBar = new Ext.IndexBar({
                    renderTo: Ext.getBody(),
                    
                    alphabet: true
                });
            });
            
            it("should set the ui property", function() {
                expect(indexBar.ui).toEqual('alphabet');
            });
        });
        
        describe("when vertical", function() {
            it("isVertical should return true", function() {
                expect(indexBar.isVertical()).toBeTruthy();
            });
        });
        
        describe("when horizontal", function() {
            beforeEach(function() {
                indexBar.destroy();
                indexBar = new Ext.IndexBar({
                    renderTo: Ext.getBody(),
                    direction: 'horizontal'
                });
            });
            
            it("isHorizontal() should be true", function() {
                expect(indexBar.isHorizontal()).toBeTruthy();
            });
        });
    });
    
    describe("when afterRender", function() {
        beforeEach(function() {
            e = {
                pageX: 0,
                pageY: 0,
                
                stopEvent: function() {},
                stopPropagation: function() {},
                preventDefault: function() {}
            };
        });
        
        describe("when using the alphabet", function() {
            beforeEach(function() {
                indexBar.destroy();
                indexBar = new Ext.IndexBar({
                    renderTo: Ext.getBody(),
                    
                    alphabet: true
                });
            });
            
            it("should load the letters into the store", function() {
                expect(indexBar.store.getAt(0).get('key')).toEqual(indexBar.letters[0].toLowerCase());
            });
        });
        
        describe("when vertical", function() {
            it("should add a vertical class", function() {
                expect(indexBar.el.hasCls(indexBar.componentCls + '-vertical')).toBeTruthy();
            });
        });
        
        describe("when horizontal", function() {
            beforeEach(function() {
                indexBar.destroy();
                indexBar = new Ext.IndexBar({
                    renderTo: Ext.getBody(),
                    
                    direction: 'horizontal'
                });
            });
            
            it("should add a horizontal class", function() {
                expect(indexBar.el.hasCls(indexBar.componentCls + '-horizontal')).toBeTruthy();
            });
        });
        
        describe("when onTouchStart", function() {
            it("should add a pressed class", function() {
                spyOn(indexBar.el, "addCls").andCallThrough();
                spyOn(indexBar, "onTouchMove");
                
                indexBar.onTouchStart(e);
                
                expect(indexBar.el.addCls).wasCalledWith(indexBar.componentCls + '-pressed');
            });
            
            it("should update pageBox", function() {
                spyOn(indexBar, "onTouchMove");
                
                indexBar.onTouchStart(e);
                
                expect(indexBar.pageBox).toEqual(indexBar.body.getPageBox());
            });
            
            it("should call onTouchMove", function() {
                spyOn(indexBar, "onTouchMove");
                
                indexBar.onTouchStart(e);
                
                expect(indexBar.onTouchMove).wasCalledWith(e);
            });
        });
        
        describe("when onTouchEnd", function() {
            it("should remove a pressed class", function() {
                spyOn(indexBar.el, "removeCls").andCallThrough();
                
                indexBar.onTouchEnd(e);
                
                expect(indexBar.el.removeCls).wasCalledWith(indexBar.componentCls + '-pressed');
            });
        });
        
        describe("when onTouchMove", function() {
            describe("when vertical", function() {
                beforeEach(function() {
                    indexBar.pageBox = {
                        bottom: 50,
                        top   : 30
                    };
                });
                
                it("should run", function() {
                    indexBar.onTouchMove({
                        pageX: 0,
                        pageY: 40,
                        
                        stopEvent: function() {},
                        stopPropagation: function() {},
                        preventDefault: function() {}
                    });
                });
                
                it("should not run", function() {
                    indexBar.onTouchMove({
                        pageX: 0,
                        pageY: 0,
                        
                        stopEvent: function() {},
                        stopPropagation: function() {},
                        preventDefault: function() {}
                    });
                });
            });
            
            describe("when horizontal", function() {
                beforeEach(function() {
                    indexBar.vertical = false;
                    indexBar.horizontal = true;
                    
                    indexBar.pageBox = {
                        left : 30,
                        right: 50
                    };
                });
                
                it("should run", function() {
                    indexBar.onTouchMove({
                        pageX: 40,
                        pageY: 0,
                        
                        stopEvent: function() {},
                        stopPropagation: function() {},
                        preventDefault: function() {}
                    });
                });
                
                it("should not run", function() {
                    indexBar.onTouchMove({
                        pageX: 0,
                        pageY: 0,
                        
                        stopEvent: function() {},
                        stopPropagation: function() {},
                        preventDefault: function() {}
                    });
                });
            });
            
            describe("when no pageBox", function() {
                beforeEach(function() {
                    indexBar.vertical = false;
                    indexBar.horizontal = true;
                    
                    indexBar.pageBox = false;
                });
                
                it("should not run", function() {
                    indexBar.onTouchMove({
                        pageX: 40,
                        pageY: 0,
                        
                        stopEvent: function() {},
                        stopPropagation: function() {},
                        preventDefault: function() {}
                    });
                });
            });
        });
    });
});