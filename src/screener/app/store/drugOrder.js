/* store for osting the drug order */
Ext.define('Screener.store.drugOrder', {
    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.drugOrder',
        proxy: {
            type: 'rest',
            url: HOST + '/ws/rest/v1/order',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json'
            }
        }
    }
})