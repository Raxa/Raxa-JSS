describe("Ext.NestedList", function() {
    var proto = Ext.NestedList.prototype,
        makeNestedList,
        nl, data, store, e;
    
    data = {
        text: 'Groceries',
        items: [{
            text: 'Drinks',
            items: [{
                text: 'Water',
                items: [{
                    text: 'Sparkling',
                    leaf: true
                },{
                    text: 'Still',
                    leaf: true
                }]
            },{
                text: 'Coffee',
                leaf: true
            },{
                text: 'Espresso',
                leaf: true
            },{
                text: 'Redbull',
                leaf: true
            },{
                text: 'Coke',
                leaf: true
            },{
                text: 'Diet Coke',
                leaf: true
            }]
        },{
            text: 'Fruit',
            items: [{
                text: 'Bananas',
                leaf: true
            },{
                text: 'Lemon',
                leaf: true
            }]
        },{
            text: 'Snacks',
            items: [{
                text: 'Nuts',
                leaf: true
            },{
                text: 'Pretzels',
                leaf: true
            },{
                text: 'Wasabi Peas',
                leaf: true
            }]
        },{
            text: 'Empty Category',
            items: []
        }]
    };
    
    Ext.regModel('ListItem', {
        fields: [{name: 'text', type: 'string'}]
    });
    
    store = new Ext.data.TreeStore({
        model: 'ListItem',
        root: data,
        proxy: {
            type: 'ajax',
            url: 'test',
            reader: {
                type: 'tree',
                root: 'items'
            }
        }
    });

    beforeEach(function() {
        makeNestedList = function(config) {
            return nl = new Ext.NestedList(Ext.apply({store: store}, config));
        };
    });

    afterEach(function() {
        if (nl) nl.destroy();
    });

    it("should have a componentCls", function() {
        expect(proto.componentCls).toEqual('x-nested-list');
    });

    it("should have a card layout", function() {
        expect(proto.layout).toEqual('card');
    });

    it("should have a slide cardSwitchAnimation", function() {
        expect(proto.cardSwitchAnimation).toEqual('slide');
    });

    it("should have backText", function() {
        expect(proto.backText).toEqual('Back');
    });

    it("should have useTitleAsBackTest cfg", function() {
        expect(proto.useTitleAsBackText).toEqual(true);
    });
    
    it("should updateTitleText", function() {
        expect(proto.updateTitleText).toBeTruthy();
    });
    
    it("should have a displayField", function() {
        expect(proto.displayField).toEqual('text');
    });
    
    it("should have loadingText", function() {
        expect(proto.loadingText).toEqual('Loading...');
    });
    
    it("should have emptyText", function() {
        expect(proto.emptyText).toEqual('No items available.');
    });
    
    it("should not have disclosure", function() {
        expect(proto.onItemDisclosure).toBeFalsy();
    });
    
    it("should have a clearSelectionDelay", function() {
        expect(proto.clearSelectionDelay).toEqual(200);
    });
    
    describe("getItemTextTpl", function() {
        it("should return the template", function() {
            expect(proto.getItemTextTpl()).toEqual('{' + proto.displayField + '}');
        });
    });
    
    describe("getTitleTextTpl", function() {
        it("should return the template", function() {
            expect(proto.getTitleTextTpl()).toEqual('{' + proto.displayField + '}');
        });
    });
    
    it("should useToolbar", function() {
        expect(proto.useToolbar).toBeTruthy();
    });
    
    describe("getDetailCard", function() {
        it("should return false", function() {
            expect(proto.getDetailCard()).toBeFalsy();
        });
    });

    describe("initComponent", function() {
        describe("when useToolbar", function() {
            it("should add a backButton", function() {
                makeNestedList();
                
                expect(nl.backButton).toBeDefined();
                expect(nl.backButton.isButton).toBeTruthy();
            });
            
            describe("when no toolbar", function() {
                describe("toolbar", function() {
                    beforeEach(function() {
                        makeNestedList();
                    });
                    
                    it("should add a toolbar", function() {
                        expect(nl.toolbar).toBeDefined();
                        expect(nl.toolbar.isToolbar).toBeTruthy();
                    });

                    it("should add the backButton to the toolbar", function() {
                        expect(nl.toolbar.items.indexOf(nl.backButton)).not.toEqual(-1);
                    });

                    it("should add the toolbar to the dockedItems", function() {
                        expect(nl.dockedItems.indexOf(nl.toolbar)).not.toEqual(-1);
                    });
                });
            });
            
            describe("when toolbar", function() {
                var toolbar;
                
                beforeEach(function() {
                    makeNestedList({
                        toolbar: toolbar = new Ext.Toolbar({
                            title: 'Test!'
                        })
                    });
                });
                
                it("should insert the backButton into the toolbar", function() {
                    expect(toolbar.items.indexOf(nl.backButton)).not.toEqual(-1);
                });
            });
        });
    });
});