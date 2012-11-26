Ext.define('RaxaEmr.Outpatient.model.DoctorOrderObservation', {
	extend: 'Ext.data.Model',
	config: {
		fields: [{
			name: 'concept',
			type: 'string'
		},
		{
			name: 'person',
			type: 'string'
		},{
			name: 'id',
			type: 'string',
			persist: false
			},
/*		{
			name: 'display',
			type: 'string'
		},*/
		{
			name: 'obsDatetime',
			type: 'string'
		},
		{
			name: 'value',
			type: 'string'
		},
/*		{
			name: 'comment',
			type: 'string'
		},
		{
			name: 'order',
			type: 'int'
		}*/]
	}
});

