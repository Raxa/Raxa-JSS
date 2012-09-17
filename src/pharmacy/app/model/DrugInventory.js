Ext.define('RaxaEmr.Pharmacy.model.DrugInventory', {
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
        name: 'status',
        type: 'string',
        mapping: 'status'
    }, {
        name: 'quantity',
        type: 'int',
        mapping: 'quantity'
    }, {
        name: 'originalQuantity',
        type: 'int',
        mapping: 'originalQuantity'
    },{
        name: 'uuid',
        type: 'string',
        persist: false
    },{
        name: 'location',
        model: 'RaxaEmr.Pharmacy.model.Location'
    },{
        name: 'drug',
        model: 'RaxaEmr.Pharmacy.model.Drug'
    },{
        name: 'drugName',
        mapping: 'drug.display'
    },{
        name: 'locationName',
        mapping: 'location.display'
    },{
        name: 'batch',
        type: 'string',
        mapping: 'batch'
    },{
        name: 'batchUuid',
        type: 'string',
        mapping: 'batchUuid',
        persist: false
    },{
        name: 'value',
        type: 'int',
        mapping: 'value'
    },{
        name: 'expiryDate',
        type: 'string',
        mapping: 'expiryDate'
    },{
        name: 'days',
        type: 'int',
        mapping: 'days',
        useNull: true
    },{
        name: 'batchQuantity',
        type: 'string',
        mapping: 'batchQuantity',
        useNull: true
    },{
        name: 'roomLocation',
        type: 'string',
        mapping: 'roomLocation'
    }
]
});