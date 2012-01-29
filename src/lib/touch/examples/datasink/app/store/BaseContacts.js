Ext.define('DataSink.store.BaseContacts', {
    extend: 'Ext.data.Store',
    requires: ['DataSink.model.Contact'], // @bug if you remove this, the model config below will not try and load it

    config: {
        model: 'DataSink.model.Contact',

        data: CONTACTS,

        proxy: "ajax" // @bug you shouldn't always need a proxy...
    }
});