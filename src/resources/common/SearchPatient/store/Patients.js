Ext.define('SearchPatient.store.Patients', {
    extend: 'Ext.data.Store',
    model: 'SearchPatient.model.Patient',
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