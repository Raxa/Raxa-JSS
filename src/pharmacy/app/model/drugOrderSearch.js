/* model for drug orders GET call*/
Ext.define('RaxaEmr.Pharmacy.model.drugOrderSearch', {
    extend: 'Ext.data.Model',
    fields: [{
            name : 'drugname',
            type: 'string',
            mapping: 'drug.name'
        }, {
            name: 'dosage',
            type: 'string',
            mapping: 'dose'
        }, {
            name: 'startDate',
            type : 'date',
            mapping: 'startDate'
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
        }]
})


