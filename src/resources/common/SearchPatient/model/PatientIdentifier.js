/* model for identifiers to be used in Patient model */
Ext.define('SearchPatient.model.Identifier', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'identifier',
        type: 'string'
    }, {
        name: 'identifierType',
        type: 'string'
    }, {
        name: 'location',
        type: 'string'
    }, {
        name: 'preferred',
        type: 'boolean'
    }]
});