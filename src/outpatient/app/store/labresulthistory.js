Ext.define('RaxaEmr.Outpatient.store.labresulthistory', {
    extend: 'Ext.data.Store',

    config: {
        model: 'RaxaEmr.Outpatient.model.labresulthistory',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'data/labresulthistory.json'
        }
    }
});