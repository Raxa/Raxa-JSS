/**
 * Does the Get call for getting patient location
 */
Ext.define('RaxaEmr.store.Locations', {
    extend: 'Ext.data.Store',
    xtype: 'locationStore',
    config: {
        storeId : 'locationStore',
        model: 'RaxaEmr.model.Location',
        proxy: {
            type: 'rest',
            headers: Util.getNewAccountAuthHeaders(),
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