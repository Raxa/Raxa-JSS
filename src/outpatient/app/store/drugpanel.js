Ext.define('RaxaEmr.Outpatient.store.drugpanel', {
    extend: 'Ext.data.Store',

    config: {
        model: 'RaxaEmr.Outpatient.model.drugpanel',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'data/drugpanel.json'
        }
    }
});