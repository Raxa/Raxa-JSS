/**
 * This store will load the patients from the file 'patients.json'
 * Note: there is no 'writer' attached to this store, so the
 * changes will only occur in local cache.
 */
Ext.define('Screener.store.Patients', {
    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.Patient',
        proxy: {
            type: 'ajax',
            url: 'data/patients.json',
            reader: 'json'
        },
        autoLoad: true
    }
});