Ext.define('mUserStories.model.encounterModel', {
    extend: 'Ext.data.Model',
    config:{
        fields: ['encounterDatetime', 'patient', 'encounterType', 'provider',
        {
            name: 'id',
            persist: false
        }]
    }
})
 