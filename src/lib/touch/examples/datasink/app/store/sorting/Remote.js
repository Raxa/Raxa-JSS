Ext.define('DataSink.store.sorting.Remote', {
    extend: 'DataSink.store.BaseContacts',

    config: {
        remoteSort: true,
        data: null,
        autoLoad: true,

        proxy: {
            type: 'ajax',
            url: 'data/contacts.php'
        }
    }
});