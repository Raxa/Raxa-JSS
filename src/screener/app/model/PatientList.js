Ext.define('Screener.model.PatientList', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'uuid',
            type: 'string'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'searchQuery',
            type: 'string'
        }, {
            name: 'id',
            type: 'int'
        }, {
            name: 'Patients',
            model: 'Screener.model.Patients'
        }]
    }
});
