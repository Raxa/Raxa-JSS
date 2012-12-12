/**
 * This class defines a Identifiers, holding 3 strings 
 * for identifier, identifiertype, location, and an 
 * boolean for preffered 
 */
Ext.define('chw.model.Identifiers', {
    extend: 'Ext.data.Model',
    config: {
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
    }
});
