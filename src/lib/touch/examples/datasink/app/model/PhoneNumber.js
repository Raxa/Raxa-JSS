Ext.define('DataSink.model.PhoneNumber', {
    extend: 'Ext.data.Model',

    config: {
        fields: ['number'],
        belongsTo: 'DataSink.model.User'
    }
});
