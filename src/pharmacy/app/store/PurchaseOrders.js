Ext.define('RaxaEmr.Pharmacy.store.PurchaseOrders', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.PurchaseOrder',
    autoLoad: false,
    autoSync: false,
    proxy: {
        type: 'rest',
        url: HOST + '/ws/rest/v1/raxacore/drugpurchaseorder',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});
