/* store for getting the patient identifiersType from the server */
Ext.define('Registration.store.identifiersType', {
    extend: 'Ext.data.Store',
    fields: [{
        name: 'uuid',
        //contains just one fiels because we only need uuid
        type: 'string'
    }],
    proxy: { //proxy for GET rest call
        type: 'rest',
        url: HOST + '/ws/rest/v1/patientidentifiertype?v=full',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});