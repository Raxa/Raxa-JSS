/* model for the drugorder */
Ext.define('RaxaEmr.Outpatient.model.drugOrder', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'patient',
        type: 'string'
    }, {
        name: 'drug',
        type: 'string'
    }, {
        name: 'concept',
        type: 'string'
    }, {
        name: 'startDate',
        type: 'date'
    }, {
        name: 'autoExpireDate',
        type: 'date'
    }, {
        name: 'dose',
        type: 'string'
    }, {
        name: 'quantity',
        type: 'number'
    }, {
        name: 'type',
        type: 'string'
    }, {
        name: 'instructions',
        type: 'string'
    }]
});
