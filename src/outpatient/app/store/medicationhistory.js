Ext.define('RaxaEmr.Outpatient.store.medicationhistory', {
    extend: 'Ext.data.Store',

    config: {
        model: 'RaxaEmr.Outpatient.model.medicationhistory',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'data/medicationhistory.json'
        }
    }
});