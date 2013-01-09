/* model for body of post call for creating the patient */
Ext.define('Registration.model.patient', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        //every model have a id field by default and it shouldn't go with post call's body so
        //we defined it and made the persist property false 
        persist: false 
    }, {
        name: 'gender',
        type: 'string'
    }, {
        name: 'age',
        type: 'number'
    }, 
    {
        name: 'birthdate',
        type: 'date'
    }, {
        name: 'uuid',
        type: 'string',
        persist: false
    }, {
        name: 'names',
        model: 'Registration.model.names'
    }, {
        name: 'addresses',
        model: 'Registration.model.addresses'
    }, {
        name: 'attributes',
        model: 'Registration.model.attributes'
    }, {
        name: 'identifier',
        type: 'string'
    }]
});