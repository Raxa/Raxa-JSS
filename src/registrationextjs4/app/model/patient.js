/* model for body of post call for creating the patient */
Ext.define('Registration.model.patient', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        persist: false
    }, {
        name: 'person',
        type: 'string'
    }, {
        name: 'identifiers',
        model: 'Registration.model.identifiers'
    }]
});