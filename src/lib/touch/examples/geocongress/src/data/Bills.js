Ext.regModel('Bills', {
    fields: ['bill-status', 'description']
});

Geo.stores.Bills = new Ext.data.Store({
    model: 'Bills',
    groupField: 'bill-status'
});