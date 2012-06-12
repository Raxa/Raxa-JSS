/**
 * Note: there is no 'writer' attached to this store, so the
 */
Ext.define('Screener.store.Patients', {
    requires: ['Screener.model.Patient'],
    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.Patient',
        proxy: {
            type: 'ajax',
            // this is a currently a placeholder. It will call all patients name 'john'
            // TODO: After backend work is done use patient list here
            url: HOST + '/ws/rest/v1/patient?q=john',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        },
        autoLoad: true
    }
});
