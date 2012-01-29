Ext.define('Docs.view.ContentList', {
    extend: 'Ext.NestedList',
    xtype: 'contentlist',
    
    config: {
        displayField: 'text',
        rootVisible: false,
        title: 'Sencha Touch 2',
        
        store: Ext.create('Docs.store.Classes')
    }
});