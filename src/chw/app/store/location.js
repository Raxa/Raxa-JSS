/* store for getting the locations */
Ext.define('mUserStories.store.location', {
    extend: 'Ext.data.Store',
    config:{
        fields: [{
            name: 'uuid',
            type: 'string'
        }],
        proxy: {
            type: 'rest',
            url: MRSHOST + '/ws/rest/v1/location',
            headers: {
                "Authorization": "Basic " + window.btoa("admin" + ":" + "Hello123"),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    }
});