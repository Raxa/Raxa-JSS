Ext.define('RaxaEmr.Pharmacy.model.Name', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'givenName',
        type: 'string'
    }, {
        name: 'familyName',
        type: 'string'
    }],
    belongsTo: 'Registration.model.Person'

});