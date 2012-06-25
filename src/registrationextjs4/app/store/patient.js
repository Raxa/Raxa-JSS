/* store for making the post call to create the patient using patient model */
Ext.define('Registration.store.patient', {
    extend: 'Ext.data.Store',
    model: 'Registration.model.patient',
    proxy: {

        type: 'rest',
        url: HOST + '/ws/rest/v1/patient',
        headers: Util.getBasicAuthHeaders(),

        reader: {
            type: 'json'
        },
        writer: {
            type: 'json'
        }
    }
});