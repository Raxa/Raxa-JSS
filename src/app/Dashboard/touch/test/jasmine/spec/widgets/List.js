describe("Ext.List", function() {
    var list, data, store, listConfig;
    
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
        
        listConfig = {
            itemTpl: new Ext.XTemplate(
                '<tpl for=".">',
                    '<div class="contact">{name} - {age}</div>',
                '</tpl>'
            ),
            
            itemSelector: 'div.contact',
            store: store,
            
            renderTo: Ext.getBody()
        };
        
        list = new Ext.List(listConfig);
    });
    
    afterEach(function() {
        list.destroy();
    });
    
    it("should have a componentCls", function() {
        expect(list.componentCls).toEqual('x-list');
    });
    
    it("should pinHeaders", function() {
        expect(list.pinHeaders).toBeTruthy();
    });
    
    it("should not have an indexBar", function() {
        expect(list.indexBar).toBeFalsy();
    });
    
    it("should not be grouped", function() {
        expect(list.grouped).toBeFalsy();
    });
    
    it("should have a renderTpl", function() {
        expect(list.renderTpl).toBeDefined();
    });
    
    it("should have a groupTpl", function() {
        expect(list.groupTpl).toBeDefined();
    });
    
    it("should not have a disclosure icon", function() {
        expect(list.onItemDisclosure).toBeFalsy();
    });
    
    describe("when rendered", function() {
        describe("scroll", function() {
            describe("when scroll is false", function() {
                beforeEach(function() {
                    list.destroy();
                    list = new Ext.List(Ext.apply(listConfig, {
                        scroll: false
                    }));
                });

                it("should not scroll", function() {
                    expect(list.scroll).toBeFalsy();
                });
            });

            describe("when scroll is not set", function() {
                it("should scroll verticall", function() {
                    expect(list.scroll).toBeDefined();
                    expect(list.scroll.direction).toEqual('vertical');
                });
            });

            describe("when scroll is vertical", function() {
                beforeEach(function() {
                    list.destroy();
                    list = new Ext.List(Ext.apply(listConfig, {
                        scroll: 'vertical'
                    }));
                });

                it("should scroll verticall", function() {
                    expect(list.scroll).toBeDefined();
                    expect(list.scroll.direction).toEqual('vertical');
                });
            });

            describe("when scroll is horizontal", function() {
                beforeEach(function() {
                    list.destroy();
                    list = new Ext.List(Ext.apply(listConfig, {
                        scroll: 'horizontal'
                    }));
                });

                it("should scroll vertical", function() {
                    expect(list.scroll).toBeDefined();
                    expect(list.scroll.direction).toEqual('vertical');
                });
            });
        });
        
        describe("grouped", function() {
            describe("when no grouped", function() {
                it("should have no indexBar", function() {
                    expect(list.indexBar).toBeFalsy();
                });
                
                describe("when indexBar = true", function() {
                    beforeEach(function() {
                        list.destroy();
                        list = new Ext.List(Ext.apply(listConfig, {
                            indexBar: true
                        }));
                    });

                    it("should have no indexBar", function() {
                        expect(list.indexBar).toBeFalsy();
                    });
                });
            });
            
            describe("when grouped", function() {
                beforeEach(function() {
                    list.destroy();
                    
                    store = new Ext.data.JsonStore({
                        model         : 'Contact',
                        sorters       : 'name',
                        getGroupString: function(record) {
                            return record.get('name')[0];
                        }
                    });

                    store.loadData(data);
                    
                    list = new Ext.List(Ext.apply(listConfig, {
                        grouped : true,
                        store   : store
                    }));
                });
                
                it("should add grouped to renderData", function() {
                    expect(list.renderData.grouped).toBeTruthy();
                });
                
                it("should add a class to renderSelectors", function() {
                    expect(list.renderSelectors.header).toEqual('.x-list-header-swap');
                });
            });
            
            describe("when using indexBar", function() {
                beforeEach(function() {
                    list.destroy();
                    
                    store = new Ext.data.JsonStore({
                        model         : 'Contact',
                        sorters       : 'name',
                        getGroupString: function(record) {
                            return record.get('name')[0];
                        }
                    });

                    store.loadData(data);
                    
                    list = new Ext.List(Ext.apply(listConfig, {
                        grouped : true,
                        indexBar: true,
                        store   : store
                    }));
                });
                
                it("should add a class", function() {
                    expect(list.el.hasCls('x-list-indexed')).toBeTruthy();
                });
                
                it("should be defined", function() {
                    expect(list.indexBar).toBeDefined();
                });
            });
            
            describe("when using scroll", function() {
                it("should have useIndicators", function() {
                    expect(list.scroll.useIndicators).toBeTruthy();
                });
            });
        });
    });
    
    describe("when deactivated", function() {
        describe("when clearSelectionOnDeactivate", function() {
            it("should call deselectAll on the selection model", function() {
                var spy = spyOn(list.getSelectionModel(), 'deselectAll');

                list.fireEvent('deactivate');
                
                expect(spy).wasCalled();
            });
        });
    });
});
