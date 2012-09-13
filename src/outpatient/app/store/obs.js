Ext.define('RaxaEmr.Outpatient.store.obs', {
    extend: 'Ext.data.Store',
    config: {
        model: 'RaxaEmr.Outpatient.model.Observation',
        proxy: {
            type: 'rest',
            url: HOST + '/ws/rest/v1/obs?patient=85d0626e-e32e-4637-8143-2d6b600cbfe3',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json'
            }
        }
    }
});
