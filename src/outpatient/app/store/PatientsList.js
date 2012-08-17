Ext.define('RaxaEmr.Outpatient.store.PatientsList', {
    requires: ['RaxaEmr.Outpatient.model.Patients'],
    extend: 'Ext.data.Store',
    config: {
        model: 'RaxaEmr.Outpatient.model.Patients',
        proxy: {
            type: 'ajax',
            // this is a currently a placeholder. It will call all patients name 'john'
            // TODO: After backend work is done use patient list here
			// link to ticket: https://raxaemr.atlassian.net/browse/RAXAJSS-156
            url: HOST + '/ws/rest/v1/raxacore/patientlist/<uuid>?v=full',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                rootProperty: 'patients'
            }
        }
    }
});
