/* model for the encounter post call */
Ext.define('RaxaEmr.Pharmacy.model.drugEncounter', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        persist: false
    }, {
        name: 'patient',
        type: 'string'
    }, {
        name: 'encounterType',
        type: 'string'
    }, {
        name: 'encounterDatetime'
    }, {
        name: 'provider'
    },
    {
        name: 'orders',
        model: 'RaxaEmr.Pharmacy.model.drugOrder'
    }]
})