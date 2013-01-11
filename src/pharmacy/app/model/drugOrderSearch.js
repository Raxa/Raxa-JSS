/* model for drug orders GET call*/
Ext.define('RaxaEmr.Pharmacy.model.drugOrderSearch', {
    extend: 'Ext.data.Model',
    sorters: ['drug.name'],
    fields: [
    {
        name: 'id',
        //every model have a id field by default and it shouldn't go with post call's body so
        //we defined it and made the persist property false 
        persist: false 
    },
    {
        name : 'drugname',
        type: 'string',
        mapping: 'drug.name'
    },
    {
        name : 'drugUuid',
        type: 'string',
        mapping: 'drug.uuid'
    }, {
        name: 'dosage',
        type: 'string',
        mapping: 'dose'
    },{
        name: 'startDate',
        type : 'date',
        mapping: 'startDate'
    },
    {
        name: 'date',
        type : 'date',
        mapping: 'startDate',
        convert: function (value, record) {
            var date = value.split("T");
            return date[0];    
    }
    }, {
        name: 'endDate',
        type: 'date',
        mapping: 'autoExpireDate'
    }, {
        name: 'quantity',
        type: 'number'
    }, {
        name: 'frequency',
        type: 'string'
    }, {
        name: 'unitPrice',
        type: 'number'
    }, {
        name: 'ItemPrice',
        type: 'number'
    }, 
    {
        name: 'instructions',
        type: 'string'
    },
    {
        name : 'orderUuid',
        type: 'string',
        mapping: 'uuid'
    }
    ]
})


