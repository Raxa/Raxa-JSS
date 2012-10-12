Ext.define('RaxaEmr.Pharmacy.store.RequisitionItems', {
    extend: 'Ext.data.Store',
    fields: ['drugname', 'quantity'],
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'localstorage'
    }
});
