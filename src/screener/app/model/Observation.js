Ext.define('Screener.model.Observation', {
    extend: 'Ext.data.Model',
    config: {
        field: [{
            name: 'uuid',
            type: 'string'
        }, {
            name: 'display',
            type: 'string'
        }, {
            name: 'links',
            type: 'string'
        }, {
            name: 'id',
            type: 'int'
        }]
    }
});
