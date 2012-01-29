Ext.define('DataSink.view.demos.AbstractList', {
    extend: 'Ext.Container',

    config: {
        layout: 'fit'
    },

    getStore: function() {
        return this.down('list').getStore();
    }
});