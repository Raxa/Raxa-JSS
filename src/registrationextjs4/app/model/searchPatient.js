/* model for search patient list */
Ext.define('Registration.model.searchPatient', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'uuid',
        type: 'string'
    }, {
        name: 'givenName',
        mapping: 'preferredName.givenName',
        type: 'string'
    }, {
        name: 'familyName',
        mapping: 'preferredName.familyName',
        type: 'string'
    }, {
        name: 'gender',
        type: 'string'
    }, {
        name: 'birthdate',
        type: 'date',
        useNull: true
    }, {
        name: 'age',
        type: 'number',
        useNull: true
    },
    /* {  //as the we dont get the identifiers of patients in search list for now i commented them
        name: 'identifier',
        type: 'string',
        mapping: 'identifiers.identifier'
    },*/
    {
        name: 'attributes',
        model: 'Registration.model.attributes'
    }, {
        name: 'address1',
        type: 'string'
    }, { //as right now this attribute don't work its commented
        name: 'address2',
        type: 'string'
    }, { //as right now this attribute don't work its commented
        name: 'postalCode',
        type: 'string'
    }, {
        name: 'cityVillage',
        type: 'string',
        mapping: 'preferredAddress.cityVillage',
        useNull: true
    }]
})