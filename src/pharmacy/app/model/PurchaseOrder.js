Ext.define('RaxaEmr.Pharmacy.model.PurchaseOrder', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        //every model have a id field by default and it shouldn't go with post call's body so
        //we defined it and made the persist property false 
        persist: false 
    }, {
        name: 'name',
        type: 'string',
        mapping: 'name'
    }, {
        name: 'description',
        type: 'string',
        mapping: 'description'
    }, {
        name: 'received',
        type: 'boolean',
        mapping: 'name'
    },{
        name: 'stockLocation',
        model: 'RaxaEmr.Pharmacy.model.Location'
    }, {
        name: 'stockLocationName',
        type: 'string',
        mapping: 'stockLocation.display'
    },{
        name: 'dispenseLocation',
        model: 'RaxaEmr.Pharmacy.model.Location'
    }, {
        name: 'dispenseLocationName',
        type: 'string',
        mapping: 'dispenseLocation.display'
    }, {
        name: 'drugPurchaseOrderDate',
        type: 'string',
        mapping: 'date'
    },{
        name: 'uuid',
        type: 'string',
        persist: false
    },{
        name: 'inventories',
        model: 'RaxaEmr.Pharmacy.model.DrugInventory'
    },{
        name: 'provider',
        type: 'string',
        mapping: 'provider'
    },
    {
        name: 'stockLocationUuid',
        type: 'string',
        mapping: 'stockLocation.uuid'
    }
]
});