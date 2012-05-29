Ext.define('RaxaEmr.Outpatient.store.patientlist', {
    extend: 'Ext.data.Store',

    config: {
        model: 'RaxaEmr.Outpatient.model.patientlist',
        autoLoad: true,
        sorters: 'firstName',
        proxy: {
            type: 'ajax',
            url: 'data/patient.json'
        }
    }
});