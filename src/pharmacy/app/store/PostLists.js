/**
 * Note: there is no 'writer' attached to this store, so the
 */
Ext.define('RaxaEmr.Pharmacy.store.PostLists', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.PostList',
    proxy: {
        type: 'ajax',
        url: HOST + '/ws/rest/v1/raxacore/patientlist',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json'
        },
        writer: 'json',
    }
    
});
