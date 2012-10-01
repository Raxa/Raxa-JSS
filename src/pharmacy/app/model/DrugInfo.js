Ext.define('RaxaEmr.Pharmacy.model.DrugInfo', {
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
        name: 'drugUuid',
        type: 'string'
    }, {
        name: 'drugName',
        type: 'string'
    }, {
        name: 'price',
        type: 'double'
    },{
        name: 'cost',
        type: 'double'
    }]
});