Ext.define('RaxaEmr.billing.model.billingItemAdjustment', {
    extend: 'Ext.data.Model',
    field: [{
        name: 'billId',
        type: 'int'
    }, {
        name: 'value',
        type: 'int'
    },{
        name: 'reason',
        type: 'string'
    }]
});