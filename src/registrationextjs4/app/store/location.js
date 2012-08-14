/* store for getting the locations */
Ext.define('Registration.store.location', {
    extend: 'Ext.data.Store',
    fields: [{
        name: 'uuid',
        type: 'string'
    }],
    proxy: {
        type: 'rest',
        url: HOST + '/ws/rest/v1/location',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});