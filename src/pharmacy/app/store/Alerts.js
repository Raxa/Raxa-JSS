Ext.define('RaxaEmr.Pharmacy.store.Alerts', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.Alert',
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'ajax',
        url: HOST + '/ws/rest/v1/raxacore/raxaalert',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type:'json',
            root: 'results'
        }
    },
    filters: [{
        property: 'seen',
        value: false
    }]
});