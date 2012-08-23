Ext.define('RaxaEmr.Outpatient.model.encounterpost', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
		{
			name: 'id',
			persist: false
		
		}, {
            name: 'patient',
            type: 'string',
            mapping: 'patient.uuid'
        },{
            name: 'encounterType',
            type: 'string'
        }, {
            name: 'encounterDatetime',
            type: 'string'
        }, {
            name: 'provider',
            type: 'string',
            mapping: 'provider.uuid'
        }, {
            name: 'location',
            type: 'string',
			persist: false
        }]
    }
});

