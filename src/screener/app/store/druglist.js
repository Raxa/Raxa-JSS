/* Store to load the list of drugs on the openmrs server */
Ext.define('Screener.store.druglist', {
    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.druglist',
        proxy: {
            type: 'rest',
            url: HOST + '/ws/rest/v1/drug?v=default',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        },
        autoLoad: true
    }
})