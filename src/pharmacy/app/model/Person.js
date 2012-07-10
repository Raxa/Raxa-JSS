Ext.define('RaxaEmr.Pharmacy.model.Person', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        //every model have a id field by default and it shouldn't go with post call's body so
        //we defined it and made the persist property false 
        persist: false 
    }, {
        name: 'gender',
        type: 'string'
    }, {
        name: 'age',
        type: 'number'
    }, {
        name: 'birthdate',
        type: 'date'
    }, {
        name: 'uuid',
        type: 'string',
        persist: false
    }, {
        name: 'names',
        model: 'RaxaEmr.Pharmacy.model.Name'
    }, {
        name: 'addresses',
        model: 'RaxaEmr.Pharmacy.model.Address'
    }]
});