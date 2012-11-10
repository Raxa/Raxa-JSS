/* names model used in Person model */
Ext.define('Registration.model.names', {
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