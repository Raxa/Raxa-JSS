Ext.define('Screener.store.AssignedPatientList', {
    requires: ['Screener.model.PatientList'],
    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.PatientList',
        proxy: {
            type: 'ajax',
            url: HOST + '/ws/rest/v1/raxacore/patientlist/<uuid>?v=full',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json'
            }
        }
    }
});
