/* store for posting the encounter with drug orders */
Ext.define('RaxaEmr.Pharmacy.store.drugEncounter', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.drugEncounter',
    proxy: {
        type: 'rest',
        url: HOST + '/ws/rest/v1/encounter',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json'
        }
    }
})