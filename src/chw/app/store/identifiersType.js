/* store for getting the patient identifiersType from the server */
Ext.define('mUserStories.store.identifiersType', {
    extend: 'Ext.data.Store',
    config:{
        fields: [{
            name: 'uuid',
            //contains just one fiels because we only need uuid
            type: 'string'
        }],
        proxy: { //proxy for GET rest call
            type: 'rest',
            url: MRSHOST + '/ws/rest/v1/patientidentifiertype',
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