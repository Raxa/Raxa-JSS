Ext.define('RaxaEmr.Outpatient.model.labresulthistory', {
    extend: 'Ext.data.Model',

    config: {
        fields: ['labtesttype', 'laborderno', 'specimenid', 'labtestdate']
    }
});