Ext.define('Screener.model.Patients', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'uuid',
            type: 'string'
        }, {
            name: 'display',
            type: 'string'
        }, {
            name: 'gender',
            type: 'string'
        }, {
            name: 'age',
            type: 'int'
        }, {
            name: 'encounters',
            model: 'Screener.model.Encounters'
        }]
    }
});
