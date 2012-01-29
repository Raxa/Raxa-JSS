Ext.define('DataSink.model.Group', {
    extend: 'Ext.data.Model',

    config: {
        fields: ['name'],
        hasMany: 'DataSink.model.Contact'
    }
});
