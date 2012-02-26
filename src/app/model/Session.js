Ext.define('RaxaEmr.model.Session', {
    extend: 'Ext.data.Model',
    fields: ['sessionId', 'authenticated'],
    proxy: {
        type: 'ajax',
        url: 'data/session.json',
        reader: {
            type: 'json'
        }
    }
});