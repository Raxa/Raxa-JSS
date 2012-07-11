Ext.define('Screener.store.AssignedPatientList', {
    requires: ['Screener.model.PatientList'],
    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.PatientList',
        proxy: {
            type: 'ajax',
            // this is a currently a placeholder. It will call all patients name 'john'
            // TODO: After backend work is done use patient list here
			// link to ticket: https://raxaemr.atlassian.net/browse/RAXAJSS-156
            url: HOST + '/ws/rest/v1/raxacore/patientlist/fd9b8c59-025e-44ba-a199-0fe4de0b45c7?v=full',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json'
            }
        }
    }
});
