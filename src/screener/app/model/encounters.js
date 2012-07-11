Ext.define('Screener.model.encounters', {
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
            model: 'Screener.model.Observation'
        }]
    }
});

