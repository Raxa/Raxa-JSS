//the store for all observation in an encounter. It should be send to obs rather than encounter

Ext.define('Registration.store.obsstore', {
    extend: 'Ext.data.Store',
    model: 'Registration.model.obsmodel',
    proxy: {
        type: 'rest',
        url : HOST + '/ws/rest/v1/obs',
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