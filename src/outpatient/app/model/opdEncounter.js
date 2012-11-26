/* model for the encounter post call */
Ext.define('RaxaEmr.Outpatient.model.opdEncounter', {
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
            name: 'provider',
            type: 'string'
        }, {
            name: 'obs',
            model: 'RaxaEmr.Outpatient.model.Observation'
        }, {
            name: 'display',
            type: 'string'
        }, {
            name: 'uuid',
            type: 'string'
        }]
    }
})