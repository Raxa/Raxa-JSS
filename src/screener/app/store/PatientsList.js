/**
 * This store will load the patients from the file 'PatientsList.json'
 * Note: there is no 'writer' attached to this store, so the
 * changes will only occur in local cache.
 */
Ext.define('Screener.store.PatientsList', {

    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.PatientList',
        proxy: {
            type: 'ajax',
            url: 'data/PatientsList.json',
            reader: {
                type: 'json'
            }
        },
        autoLoad: true
    }
});
