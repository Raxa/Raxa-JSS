/* model for body of post call for creating the patient */
Ext.define('mUserStories.model.upPatientModel', {
    extend: 'Ext.data.Model',
    config:{
    fields: [{
        name: 'id',
        persist: false
    }, {
        name: 'person',
        type: 'string'
    }, {
        name: 'identifiers',
        model: 'mUserStories.model.identifiers'
    }]
}
});