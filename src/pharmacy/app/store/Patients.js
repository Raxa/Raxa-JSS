Ext.define('RaxaEmr.Pharmacy.store.Patients', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.Patient',
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