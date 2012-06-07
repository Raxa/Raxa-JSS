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
            name: 'Obs',
            model: 'Screener.model.Obs'
        }]
    }

});
