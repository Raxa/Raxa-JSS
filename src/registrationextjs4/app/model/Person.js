/* model for Person */
Ext.define('Registration.model.Person', {
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
    }, {
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
        model: 'Registration.model.attributes',
        //this is false because there is a bug in openmrs due to which sending attributes in body leads 
        //to 500 response status 
        //TODO: remove this once the open mrs server is updated to latest one
        persist: false 
    }]
});