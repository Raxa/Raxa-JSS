/* store for posting the encounter with drug orders */
Ext.define('Screener.store.drugEncounter', {
    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.drugEncounter',
        proxy: {
            type: 'rest',
            url: HOST + '/ws/rest/v1/encounter',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json'
            }
        }
    }
})