Ext.define('RaxaEmr.Outpatient.store.Grid', {
    extend: 'Ext.data.Store',

    config: {
        model: 'RaxaEmr.Outpatient.model.Grid',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'data/property.json'
        }
    }
});