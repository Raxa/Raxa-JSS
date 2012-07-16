Ext.define('RaxaEmr.Pharmacy.model.raxacoreEncounter', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'uuid',
        type: 'string'
    }, {
        name: 'display',
        type: 'string'
    }, {
        name: 'encounterType',
        type: 'string'
    }, {
        name: 'encounterDatetime',
        type: 'date'
    }, {
        name: 'provider',
        typr: 'string'
    }]
})