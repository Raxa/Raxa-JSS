Ext.define('RaxaEmr.Outpatient.model.opdObservation', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'person',
            type: 'string'
        }, {
            name: 'concept',
            type: 'string'
        }, {
            name: 'obsDatetime',
            type: 'string'
        }, {
            name: 'value',
            type: 'string'
        }]
    }
});
