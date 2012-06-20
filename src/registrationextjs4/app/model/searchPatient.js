//model for search patient list
Ext.define('Registration.model.searchPatient', {
    extend: 'Ext.data.Model',
    fields: [{
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
        type: 'date'
    },
    /*{  //as the we dont get the identifiers of patients in search list for now i commented them
        name: 'identifier',
        type: 'string',
        mapping: 'identifiers.identifier'
    }, {    //as right now this attribute don't work its commented
       name: 'Husbands/fathersName',
       type: 'string'
    },*/
    {
        name: 'cityVillage',
        type: 'string',
        mapping: 'preferredAddress.cityVillage'
    }]
})