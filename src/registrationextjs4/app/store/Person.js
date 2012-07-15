/* store for Person model */
Ext.define('Registration.store.Person', {
    extend: 'Ext.data.Store',
    model: 'Registration.model.Person',
    proxy: {

        type: 'rest',
        url: HOST + '/ws/rest/v1/person',
        headers: Util.getBasicAuthHeaders(),

        reader: {
            type: 'json'
        },
        writer: {
            type: 'json'
        }
    }
});