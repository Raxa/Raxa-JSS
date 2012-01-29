Ext.define('DataSink.model.Contact', {
    extend: 'Ext.data.Model',

    requires: ['DataSink.model.Group', 'DataSink.model.PhoneNumber'],
    
    config: {
        fields: ['firstName', 'lastName'],
        belongsTo: 'DataSink.model.Group',
        hasOne: 'DataSink.model.PhoneNumber'
    }
});
