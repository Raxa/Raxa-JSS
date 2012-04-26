Ext.define('RaxaEmr.Screener.model.MapPatientsList', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'patientname'
    }, {
        name: 'waitingtime',
    }],

    proxy: {
        type: 'ajax',
        url: 'data/mappatientslist.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});