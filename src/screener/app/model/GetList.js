Ext.define('Screener.model.GetList', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'uuid',
            type: 'string',
        }, {
            name: 'display',
            type: 'string'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'patients',
            model: 'Screener.model.Patients'
        }]
    }
});
