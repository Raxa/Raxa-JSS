Ext.define('RaxaEmr.Pharmacy.model.DrugInventory', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        //every model have a id field by default and it shouldn't go with post call's body so
        //we defined it and made the persist property false 
        persist: false 
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'status',
        type: 'string'
    }, {
        name: 'quantity',
        type: 'int'
    }, {
        name: 'originalQuantity',
        type: 'int'
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
        type: 'string'
    },{
        name: 'batchUuid',
        type: 'string',
        persist: false
    },{
        name: 'value',
        type: 'int'
    },{
        name: 'expiryDate',
        type: 'string'
    },{
        name: 'days',
        type: 'int',
        useNull: true
    },{
        name: 'batchQuantity',
        type: 'string',
        useNull: true
    },{
        name: 'roomLocation',
        type: 'string'
    },{
        name: 'locationUuid',
        type: 'string',
        mapping: 'location.uuid'
    },{
        name: 'months',
        type: 'string',
        persist: false
    },{
        name: 'drugUuid',
        mapping: 'drug.uuid'
    },{
        name: 'supplier',
        type: 'string',
        persist: false
    },{
        name: 'dosageForm',
        mapping: 'drug.dosageForm'
    }
]
});