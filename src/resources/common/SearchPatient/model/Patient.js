Ext.define('SearchPatient.model.Patient', {
    requires: ['SearchPatient.model.Person', 'SearchPatient.model.PatientIdentifier'],
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        persist: false
    }, {
        name: 'uuid',
    }, {
        name: 'person',
        model: 'SearchPatient.model.Person'
    }, {
        name: 'identifiers',
        model: 'SearchPatient.model.PatientIdentifier'
    }, {
        name: 'age',
        mapping: 'person.age'
    }, {
        name: 'name',
        mapping: 'person.display'
    }, {
        name: 'identifier',
        mapping: 'identifiers[0].identifier'
    }]
});