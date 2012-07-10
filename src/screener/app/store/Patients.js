/**
 * Note: there is no 'writer' attached to this store, so the
 */
Ext.define('Screener.store.Patients', {
    requires: ['Screener.model.Patients'],
    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.Patients',
        proxy: {
            type: 'ajax',
            // this is a currently a placeholder. It will call all patients name 'john'
            // TODO: After backend work is done use patient list here
			// link to ticket: https://raxaemr.atlassian.net/browse/RAXAJSS-156
            url: HOST + '/ws/rest/v1/raxacore/patientlist/patients',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    }
});
