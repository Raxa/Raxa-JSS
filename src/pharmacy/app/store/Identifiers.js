Ext.define('RaxaEmr.Pharmacy.store.Identifiers', {
    extend: 'Ext.data.Store',
    fields: [{
        name: 'uuid',
        //contains just one fiels because we only need uuid
        type: 'string'
    }],
    proxy: { //proxy for GET rest call
        type: 'rest',
        url: HOST + '/ws/rest/v1/patientidentifiertype',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});
