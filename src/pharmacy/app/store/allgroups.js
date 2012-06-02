Ext.define('RaxaEmr.Pharmacy2.store.allgroups', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy2.model.groupmodel',
    storeId: 'grouplist',
    proxy: {
        type: 'localstorage',
        id: 'groupId'
    },
    autoLoad: true
});