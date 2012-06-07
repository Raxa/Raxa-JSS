Ext.define('Screener.model.Obs', {
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
