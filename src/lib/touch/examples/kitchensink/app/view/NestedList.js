Ext.require('Ext.data.TreeStore', function(TreeStore) {

Ext.define('Kitchensink.view.NestedList', {
    requires: ['Kitchensink.view.EditorPanel', 'Kitchensink.model.Cars'],
    extend: 'Ext.Container',
    config: {
        layout: 'fit',
        items: [{
            xtype: 'nestedlist',
            store: {
                type: 'tree',
                id: 'NestedListStore',
                model: 'Kitchensink.model.Cars',
                root: {},
                proxy: {
                    type: 'ajax',
                    url: 'carregions.json'
                }
            },
            displayField: 'text',
            listeners: {
                leafitemtap: function(me, list, index, item) {
                    var editorPanel = Ext.getCmp('editorPanel') || new Kitchensink.view.EditorPanel();
                    editorPanel.setRecord(list.getStore().getAt(index));
                    editorPanel.show();
                }
            }
        }]
    }
});

});
