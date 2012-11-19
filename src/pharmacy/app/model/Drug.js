Ext.define('RaxaEmr.Pharmacy.model.Drug', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        //every model have a id field by default and it shouldn't go with post call's body so
        //we defined it and made the persist property false 
        persist: false 
    }, {
        name: 'display',
        type: 'string',
        mapping: 'display'
    },{
        name: 'uuid',
        type: 'string',
        persist: false
    }]
});
