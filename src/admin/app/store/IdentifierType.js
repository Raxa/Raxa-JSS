/**
 * Does the Get call for getting patient identifiers
 */
Ext.define('RaxaEmr.Admin.store.IdentifierType', {
    extend: 'Ext.data.Store',
    xtype: 'identifierTypeStore',
    config: {
        fields: [{
                name: 'uuid',
                type: 'string'
        }],
        proxy: {
            type: 'rest',
            url: HOST + '/ws/rest/v1/patientidentifiertype',
            headers: Util.getBasicAuthHeaders(),
            reader: {
              type: 'json', 
              rootProperty: 'results'
            },
            writer: {
              type: 'json'
            }
        }
    }
});