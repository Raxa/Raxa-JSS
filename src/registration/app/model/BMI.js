Ext.define('RaxaEmr.Registration.model.BMI', {
	extend: 'Ext.data.Model',
	config: {
		proxy: {
			type: 'localstorage',
			id: 'bmi'
		},
		fields: [{
			name: 'Height',
			type: 'int'
		},
		{
			name: 'Height2',
			type: 'int'
		},
		{
			name: 'Weight',
			type: 'int'
		},

    ]
	}
});

