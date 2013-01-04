Ext.define('RaxaEmr.common.store.SearchPatientStore', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.common.model.Patient',
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