/**
 * Note: there is no 'writer' attached to this store, so the
 */
Ext.define('RaxaEmr.Outpatient.store.PostLists', {
    requires: ['RaxaEmr.Outpatient.model.PostList'],
    extend: 'Ext.data.Store',
    config: {
        model: 'RaxaEmr.Outpatient.model.PostList',
        proxy: {
            type: 'ajax',
            url: HOST + '/ws/rest/v1/raxacore/patientlist',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json'
            },
            writer: 'json',
        }
    }
});
