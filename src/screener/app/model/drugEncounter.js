/* model for the encounter post call */
Ext.define('Screener.model.drugEncounter', {
    extend: 'Ext.data.Model',
    config: {
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
            name: 'orders',
            model: 'RaxaEmr.Pharmacy.model.drugOrder'
        }]
    }
})