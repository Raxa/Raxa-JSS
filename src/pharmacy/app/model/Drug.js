Ext.define('RaxaEmr.Pharmacy.model.Drug', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        //every model have a id field by default and it shouldn't go with post call's body so
        //we defined it and made the persist property false 
        persist: false 
    }, {
        name: 'name',
        type: 'string'
    },{
        name: 'uuid',
        type: 'string',
        persist: false
    },{
        name: 'dosageForm',
        type: 'string'
    },{
        name: 'strength',
        type: 'double'
    },{
        name: 'units',
        type: 'string'
    },{
        name: 'concept',
        type: 'string'
    },{
        name: 'cost',
        type: 'double'
    },{
        name: 'price',
        type: 'double'
    },{
        name: 'brandName',
        type: 'string'
    },{
        name: 'manufacturer',
        type: 'string'
    },{
        name: 'reorderLevel',
        type: 'int'
    },{
        name: 'shortName',
        type: 'string'
    },{
        name: 'supplier',
        type: 'string'
    }]
});
