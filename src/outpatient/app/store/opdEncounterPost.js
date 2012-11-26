/* store for posting the encounter with drug orders */
Ext.define('RaxaEmr.Outpatient.store.opdEncounterPost', {
    extend: 'Ext.data.Store',
    config: {
        model: 'RaxaEmr.Outpatient.model.opdEncounter',
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