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
        name: 'stocklocation',
        model: 'RaxaEmr.Pharmacy.model.Location'
    }, {
        name: 'stocklocationname',
        type: 'string',
        mapping: 'stocklocation.display'
    },{
        name: 'dispenselocation',
        model: 'RaxaEmr.Pharmacy.model.Location'
    }, {
        name: 'dispenselocationname',
        type: 'string',
        mapping: 'dispenselocation.display'
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
    }]
});