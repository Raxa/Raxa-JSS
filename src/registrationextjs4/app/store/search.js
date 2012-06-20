// store for search patient model
Ext.define('Registration.store.search', {
    extend: 'Ext.data.Store',
    model: 'Registration.model.searchPatient',
    proxy: {
        type: 'rest',
        url: HOST + '/ws/rest/v1/patient?q=piyush&&v=full',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});