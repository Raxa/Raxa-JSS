Ext.define('RaxaEmr.Screener.store.MapPatientsList', {
    extend: 'Ext.data.Store',
    storeId: 'mappatientslist',
    requires: 'RaxaEmr.Screener.model.MapPatientsList',
    model: 'RaxaEmr.Screener.model.MapPatientsList',
    sorters: ['patientname', 'waitingtime']
});