Ext.define('RaxaEmr.billing.store.itemS', {
    extend: 'Ext.data.Store',
    fields: ['item_name', 'category', 'quantity', 'price', 'discount', 'discountReason', 'total'],
    groupField: 'category',
    autoLoad: false,
    autoSync: false,
    proxy: {
        type: 'rest',
        url: HOST + '/ws/rest/v1/raxacore/billing?v=2',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        },
        writer: {
            type: 'json'
        },
        afterRequest: function(request, success) {
            console.log("succ")
        }
    }
});