Ext.define('RaxaEmr.Admin.store.Providers', {
    requires: ['RaxaEmr.Admin.model.Provider'],
    extend: 'Ext.data.Store',
    config: {
        model: 'RaxaEmr.Admin.model.Provider',
        proxy: {
            type: 'ajax',
            url: HOST +'/ws/rest/v1/provider?v=full',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        },
        autoLoad: true,
    }
}); 
