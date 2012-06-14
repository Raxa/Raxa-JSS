//the store for an encounter. Sends all filledd fields to the server

Ext.define('Registration.store.encounterstore', {
    extend: 'Ext.data.Store',
    model: 'Registration.model.encountermodel',
    proxy: {
        type: 'rest',
        url : HOST + '/ws/rest/v1/encounter',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json'
        },
        afterRequest:function(request,success){         //prints if request is successful
            console.log(success);
        }
    }
});