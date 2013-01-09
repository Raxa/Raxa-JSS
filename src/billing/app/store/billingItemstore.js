Ext.define('RaxaEmr.billing.store.billingItemstore', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.billing.model.billingItem',
    proxy: {
        type: 'rest',
        url: HOST + '/ws/rest/v1/raxacore/billing',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        },
        writer: {
            type: 'json'
        }
    }
});
