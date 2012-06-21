/**
 * This class defines a Names, holding 2 strings 
 * for givenName and familyName 
 */
Ext.define('Screener.model.Names',{
    extend: 'Ext.data.Model',
    config: {
        fields: [ {
            name: 'givenName',
            type: 'string'
        }, {
            name: 'familyName',
            type: 'string'
        }]
    }
});