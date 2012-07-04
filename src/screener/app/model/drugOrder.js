/* model for the drugorder */
Ext.define('Screener.model.drugOrder', {
    extend: 'Ext.data.Model',
    config: {
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
            name: 'frequency',
            type: 'string'
        }, {
            name: 'type',
            type: 'string'
        }, {
            name: 'instructions',
            type: 'string'
        }]
    }
});