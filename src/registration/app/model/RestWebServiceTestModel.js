Ext.define('RaxaEmr.Registration.model.RestWebServiceTestModel', {
	extend: 'Ext.data.Model',
	fields: ['uuid', 'name', 'gender'],
config: {
		proxy: {
			type: 'rest',
			url: 'http://localhost:8080/openmrs/ws/rest/v1/patient/?q='
		},
		fields: [{
			name: 'name',
			type: 'string'
		},
		{
			name: 'uuid',
			type: 'int'
		},
		{
			name: 'gender',
			type: 'string'
		},

    ]
	}
});

