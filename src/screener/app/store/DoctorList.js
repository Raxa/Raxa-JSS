Ext.define('Screener.store.DoctorList', {
    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.DoctorList',
        proxy: {
            type: 'rest',
            url: HOST +'/ws/rest/v1/provider',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        },
        autoLoad: true
    }
});