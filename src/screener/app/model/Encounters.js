Ext.define('Screener.model.Encounters', {

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
            name: 'id',
            type: 'int'
        }, {
            name: 'obs',
            model: 'Screener.model.Observation'
        }]
    }

});
