/**
 * Does the Get call for getting patient location
 */
Ext.define('RaxaEmr.Admin.store.Locations', {
    extend: 'Ext.data.Store',
    xtype: 'locationStore',
    config: {
        model: 'RaxaEmr.Admin.model.Location',
        proxy: {
            type: 'rest',
            headers: Util.getBasicAuthHeaders(),
            url: HOST + '/ws/rest/v1/location?v=full',
            reader: {
              type: 'json',
              rootProperty: 'results'
            },
            writer: {
              type: 'json',
              rootProperty: 'results'
            }
        },
        autoLoad: true
    }
});