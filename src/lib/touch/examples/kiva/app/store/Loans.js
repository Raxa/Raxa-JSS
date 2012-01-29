Ext.define('Kiva.store.Loans', {
    extend  : 'Ext.data.Store',
    model   : 'Kiva.model.Loan',
    requires: ['Kiva.model.Loan'],

    autoLoad    : true,
    remoteFilter: true
});