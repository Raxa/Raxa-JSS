Ext.define('RaxaEmr.Outpatient.model.Observation', {
	extend: 'Ext.data.Model',
	config: {
		fields: [{
			name: 'uuid',
			type: 'string'
		},
		{
			name: 'display',
			type: 'string'
		},
		{
			name: 'obsDatetime',
			type: 'string'
		},
		{
			name: 'value',
			type: 'string'
		},
		{
			name: 'comment',
			type: 'string'
		},
		{
			name: 'order',
			type: 'int'
		}]
	}
});

