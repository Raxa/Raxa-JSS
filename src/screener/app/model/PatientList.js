Ext.define('Screener.model.PatientList', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'uuid',
            type: 'int'
        }, {
            name: 'display',
            type: 'string'
        }, {
            name: 'links',
            model: 'Screener.model.Links'
        }]
    }
});