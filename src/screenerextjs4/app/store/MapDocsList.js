Ext.define('RaxaEmr.Screener.store.MapDocsList', {
    extend: 'Ext.data.Store',
    requires: 'RaxaEmr.Screener.model.MapDocsList',
    model: 'RaxaEmr.Screener.model.MapDocsList',
    sorters: ['docname', 'noofpatients']
});