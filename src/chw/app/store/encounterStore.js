Ext.define('mUserStories.store.encounterStore', {
    extend: 'Ext.data.Store',
    config:{
        model: 'mUserStories.model.encounterModel',
        proxy: {
            type: 'rest',
            url : MRSHOST + '/ws/rest/v1/encounter',
            headers: HEADERS,
            reader: {
                type: 'json'
            },
            writer: {
                type: 'json'
            }
        }
    }
});