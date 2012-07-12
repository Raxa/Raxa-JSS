Ext.define('Screener.store.PatientList', {
    requires: ['Screener.model.PatientList'],
    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.Patients',
        proxy: {
            type: 'ajax',
            url: HOST + '/ws/rest/v1/raxacore/patientlist',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
				rootProperty: 'patients'
            }
        }
    }
});
