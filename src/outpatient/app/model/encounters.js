Ext.define('RaxaEmr.Outpatient.model.encounters', {
    extend: 'Ext.data.Model',
    config: {
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
            type: 'string'
        }, {
            name: 'provider',
            type: 'string'
        }, {
            name: 'obs',
            model: 'RaxaEmr.Outpatient.model.Observation'
        }]
    }
});

