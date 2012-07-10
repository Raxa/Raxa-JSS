Ext.define('mUserStories.store.encounterStore', {
    extend: 'Ext.data.Store',
    config:{
        model: 'mUserStories.model.encounterModel',
        proxy: {
            type: 'rest',
            url : MRSHOST + '/ws/rest/v1/encounter',
            headers: {
                "Authorization": localStorage.getItem('basicAuthHeader'),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            reader: {
                type: 'json'
            },
            writer: {
                type: 'json'
            }
        }
    }
});