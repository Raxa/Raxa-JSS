Ext.define('Docs.store.Guides', {
    extend: 'Ext.data.TreeStore',
    
    constructor: function() {
        Ext.apply(this, {
            storeId: 'AllClasses',
            
            fields: ['text', 'type'],
            defaultRootProperty: 'items',
            rootVisible: false,
            
            root: {
                text: 'Guides',
                items: [
                    {
                        text: 'Layouts',
                        type: 'guide',
                        id: 'layouts',
                        leaf: true
                    },
                    {
                        text: 'Data',
                        type: 'guide',
                        id: 'data',
                        leaf: true
                    }
                ]
            }
        });
        
        this.callParent(arguments);
    }
});