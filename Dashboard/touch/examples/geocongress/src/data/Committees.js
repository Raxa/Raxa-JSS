Ext.regModel('Committees', {
    fields: ['id', 'name']
});

Geo.stores.Committees = new Ext.data.Store({
    model: 'Committees'
});