describe("Ext.DataView", function() {
    var proto = Ext.DataView.prototype,
        buildDataView, dv, panel, store, data;
    
    beforeEach(function() {
        Ext.regModel('Contact', {
            fields: [
                'name',
                'age'
            ]
        });
        
        data = [
            {
                name: 'Robert Dougan',
                age : 21
            },
            {
                name: 'Sarah Gannon',
                age : 18
            }
        ];
        
        store = new Ext.data.JsonStore({
            model: 'Contact'
        });
        
        store.loadData(data);
        
        buildDataView = function(config) {
            dv = new Ext.DataView(Ext.apply({
                tpl: new Ext.XTemplate(
                    '<tpl for=".">',
                        '<div class="contact">{name} - {age}</div>',
                    '</tpl>'
                ),

                itemSelector: 'div.contact',
                store       : store
            }, config));
            
            panel = new Ext.Panel({
                fullscreen: true,
                renderTo  : false,
                items     : dv
            });
            
            return dv;
        };
    });
    
    afterEach(function() {
        if (dv) dv.destroy();
        if (panel) panel.destroy();
    });
    
    it("should have a default scroll", function() {
        expect(proto.scroll).toEqual('vertical');
    });
    
    it("should have a pressedCls", function() {
        expect(proto.pressedCls).toEqual('x-item-pressed');
    });
    
    it("should have a pressedDelay", function() {
        expect(proto.pressedDelay).toEqual(100);
    });
    
    it("should allow allowDeselect", function() {
        expect(proto.allowDeselect).toBeTruthy();
    });
    
    it("should have a triggerEvent", function() {
        expect(proto.triggerEvent).toEqual('singletap');
    });
    
    it("should have a triggerCtEvent", function() {
        expect(proto.triggerCtEvent).toEqual('containertap');
    });
    
    describe("addCmpEvents", function() {
        describe("when forceSelection", function() {
            it("should throw an error", function() {
                var fn = function() {
                    buildDataView({
                        forceSelection: true
                    });
                };
                
                expect(fn).toThrow('DataView: forceSelection has been replaced by allowDeselect.');
            });
        });
    });
    
    describe("event methods", function() {
        var record, node, el, isItem;
        
        beforeEach(function() {
            isItem = true;
            
            buildDataView();
            panel.render(Ext.getBody());
            
            record = dv.store.getAt(0);
            node   = dv.getNode(record);
            el     = Ext.fly(node);
            
            //we need to overwrite this to return a node
            dv.findTargetByEvent = function() {
                return (isItem) ? node : null;
            };
        });
        
        describe("onTap", function() {
            describe("when there is an item", function() {
                it("should remove dv.pressedCls", function() {
                    el.addCls(dv.pressedCls);
                    expect(el.hasCls(dv.pressedCls)).toBeTruthy();
                    
                    dv.onTap();
                    
                    expect(el.hasCls(dv.pressedCls)).toBeFalsy();
                });
                
                it("should call onItemTap", function() {
                    var spy = spyOn(dv, "onItemTap");
                    
                    dv.onTap();
                    
                    expect(spy).wasCalled();
                });
                
                it("should fire the itemtap event", function() {
                    var fired = false;
                    
                    dv.on({
                        itemtap: function() { fired = true; }
                    });
                    
                    dv.onTap();
                    
                    expect(fired).toBeTruthy();
                });
            });
            
            describe("when there is not an item", function() {
                beforeEach(function() {
                    isItem = false;
                });
                
                it("should fire the containertap event", function() {
                    var fired = false;
                    
                    dv.on({
                        containertap: function() { fired = true; }
                    });
                    
                    dv.onTap();
                    
                    expect(fired).toBeTruthy();
                });
                
                it("should call onContainerTap", function() {
                    var spy = spyOn(dv, "onContainerTap");
                    
                    dv.onTap();
                    
                    expect(spy).wasCalled();
                });
            });
        });
        
        describe("onTapStart", function() {
            describe("when there is an item", function() {
                describe("when there is a pressedDelay", function() {
                    it("should add the pressedCls after the set time", function() {
                        runs(function() {
                            expect(el.hasCls(dv.pressedCls)).toBeFalsy();
                            
                            dv.onTapStart();
                        });
                                                
                        runs(function() {
                            return el.hasCls(dv.pressedCls) === true;
                        }, "pressedCls class wasn't added");
                    });
                });
                
                describe("when there is no pressedDelay", function() {
                    beforeEach(function() {
                        dv.destroy();
                        panel.destroy();
                        
                        buildDataView({
                            pressedDelay: false
                        });
                        panel.render(Ext.getBody());

                        record = dv.store.getAt(0);
                        node   = dv.getNode(record);
                        el     = Ext.fly(node);

                        //we need to overwrite this to return a node
                        dv.findTargetByEvent = function() {
                            return node;
                        };
                    });
                    
                    it("should add the pressedCls", function() {
                        expect(el.hasCls(dv.pressedCls)).toBeFalsy();
                        
                        dv.onTapStart();
                        
                        expect(el.hasCls(dv.pressedCls)).toBeTruthy();
                    });
                });
            });
        });
        
        describe("onTapCancel", function() {
            describe("when there is a timeout", function() {
                beforeEach(function() {
                    dv.pressedTimeout = setTimeout(function() {}, 1000);
                });
                
                it("should call clearTimeout", function() {
                    var spy = spyOn(window, "clearTimeout");
                    
                    dv.onTapCancel();
                    
                    expect(spy).wasCalled();
                });
            });
            
            describe("when item", function() {
                beforeEach(function() {
                    el.addCls(dv.pressedCls);
                });
                
                it("should remove the pressedCls", function() {
                    expect(el.hasCls(dv.pressedCls)).toBeTruthy();
                    
                    dv.onTapCancel();
                    
                    expect(el.hasCls(dv.pressedCls)).toBeFalsy();
                });
            });
        });
        
        describe("onDoubleTap", function() {
            it("should fire the itemdoubletap event", function() {
                var fired = false;
                
                dv.on({
                    itemdoubletap: function() { fired = true; }
                });
                
                dv.onDoubleTap();
                
                expect(fired).toBeTruthy();
            });
        });
        
        describe("onSwipe", function() {
            it("should fire the itemswipe event", function() {
                var fired = false;
                
                dv.on({
                    itemswipe: function() { fired = true; }
                });
                
                dv.onSwipe();
                
                expect(fired).toBeTruthy();
            });
        });
        
        describe("onItemTap", function() {
            describe("when pressedTimeout", function() {
                beforeEach(function() {
                    dv.pressedTimeout = setTimeout(function() {}, 1000);
                });
                
                it("should call clearTimeout", function() {
                    var spy = spyOn(window, "clearTimeout");
                    
                    dv.onItemTap();
                    
                    expect(spy).wasCalled();
                });
            });
            
            it("should return true", function() {
                expect(dv.onItemTap()).toBeTruthy();
            });
        });
    });
});
