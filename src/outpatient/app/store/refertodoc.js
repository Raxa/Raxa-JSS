Ext.define('RaxaEmr.Outpatient.store.refertodoc', {
    extend: 'Ext.data.Store',

    config: {
        model: 'RaxaEmr.Outpatient.model.refertodoc',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'data/refertodoc.json'
        }
    }
});