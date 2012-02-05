Ext.define('RaxaEmr.store.SessionStore', {
    extend: 'Ext.data.Store',
    requires: 'RaxaEmr.model.Session',
    model: 'RaxaEmr.model.Session',
    autoLoad: true
});