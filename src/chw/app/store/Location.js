/**
 * Does the Get call for getting patient location
 */
Ext.define('chw.store.Location', {
    extend: 'Ext.data.Store',
    xtype: 'locationStore',
    config: {
        fields: [{
                name: 'uuid',
                type: 'string'
        }],
        proxy: {
            type: 'rest',
            headers: Util.getBasicAuthHeaders(),
            url: HOST + '/ws/rest/v1/location',
            reader: {
              type: 'json',
              rootProperty: 'results'
            },
            writer: {
              type: 'json',
              rootProperty: 'results'
            }
        }
    }
});