// model of an encounter

Ext.define('Registration.model.encountermodel', {
    extend: 'Ext.data.Model',
    
    fields: ['encounterDatetime', 'patient', 'encounterType', 'location', 'form', 'provider', 'orders',
    {//includes the obs model so that it can be stored at each time
        name: 'obs',
        model: 'Registration.model.obsmodel'
    },{
        name: 'id',
        persist: false
    }]
})