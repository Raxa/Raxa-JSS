Ext.define('DataSink.model.Demo', {
    extend: 'Ext.data.Model',

    config: {
        fields: ['category', 'type'],

        proxy: "ajax"
    }
});
