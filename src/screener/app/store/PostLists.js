/**
 * Note: there is no 'writer' attached to this store, so the
 */
Ext.define('Screener.store.PostLists', {
    requires: ['Screener.model.PostList'],
    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.PostList',
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
