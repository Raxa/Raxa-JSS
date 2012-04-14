Ext.define('RaxaEmr.Screener.model.MapDocsList', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'docname'
    }, {
        name: 'noofpatients',
		type: 'int'
    }],
    
    proxy: {
        type: 'ajax',
        url: 'data/mapdocslist.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});