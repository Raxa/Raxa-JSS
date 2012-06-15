Ext.define('Screener.model.DoctorList', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'

        }, {
            name: 'uuid',
            type: 'string'
        }, {
            name: 'display',
            type: 'string'
        }]
    }
});