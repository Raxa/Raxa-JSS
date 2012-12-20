Ext.define('RaxaEmr.billing.store.billingItemAdjsstore', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.billing.model.billingItemAdjustment',
    proxy: {

        type: 'rest',
         url: 'http://localhost:8081/openmrs-standalone/ws/rest/v1/raxacore/billing',
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