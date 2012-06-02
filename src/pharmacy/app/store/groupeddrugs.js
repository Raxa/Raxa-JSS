Ext.define('RaxaEmr.Pharmacy2.store.groupeddrugs', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy2.model.drugmodel',
    storeId: 'druggroups',
    proxy: {
        type: 'localstorage',
        id: 'grouped'
    },
    autoLoad: true
});