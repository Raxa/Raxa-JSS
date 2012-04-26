Ext.define('RaxaEmr.Screener.model.DocsList', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'docname'
    }, {
        name: 'patientname',
    }],

    proxy: {
        type: 'ajax',
        url: 'data/docslist.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});