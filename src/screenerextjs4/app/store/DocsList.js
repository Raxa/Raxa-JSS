Ext.define('RaxaEmr.Screener.store.DocsList', {
    extend: 'Ext.data.Store',
    requires: 'RaxaEmr.Screener.model.DocsList',
    model: 'RaxaEmr.Screener.model.DocsList',
    sorters: ['docname', 'patientname'],
    groupField: 'docname',
});