Ext.define('RaxaEmr.Pharmacy.store.Doctors', {
    requires: ['RaxaEmr.Pharmacy.model.Doctor'],
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.Doctor',
    proxy: {
        type: 'ajax',
        url: HOST +'/ws/rest/v1/provider',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        }
    },
    autoLoad: true
}); 