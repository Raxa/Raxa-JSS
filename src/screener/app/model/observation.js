Ext.define('Screener.model.observation', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['person', 'obsDatetime', 'concept', 'value', {
            name: 'id',
            persist: false
        }],
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
    }
});

