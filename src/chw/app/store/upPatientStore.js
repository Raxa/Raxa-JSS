/* store for making the post call to create the patient using patient model */
Ext.define('mUserStories.store.upPatientStore', {
    extend: 'Ext.data.Store',
    config:{
        model: 'mUserStories.model.upPatientModel',
        proxy: {

            type: 'rest',
            url: MRSHOST + '/ws/rest/v1/patient',
            headers: {
                "Authorization": "Basic " + window.btoa("admin" + ":" + "Hello123"),
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