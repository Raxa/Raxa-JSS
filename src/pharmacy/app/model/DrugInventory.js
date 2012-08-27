Ext.define('RaxaEmr.Pharmacy.model.DrugInventory', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        //every model have a id field by default and it shouldn't go with post call's body so
        //we defined it and made the persist property false 
        persist: false 
    }, {
        name: 'status',
        type: 'string',
        mapping: 'status'
    }, {
        name: 'quantity',
        type: 'int',
        mapping: 'quantity'
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
    }]
});