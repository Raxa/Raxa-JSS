Ext.define('RaxaEmr.Outpatient.model.Grid', {
    extend: 'Ext.data.Model',

    config: {
        fields: ['height', 'weight', 'bmi', 'bp', 'pulse', 'resrate', 'temp', 'oxysat']
    }
});