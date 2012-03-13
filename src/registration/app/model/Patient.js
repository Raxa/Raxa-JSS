Ext.define('RaxaEmr.Registration.model.Patient', {
	extend: 'Ext.data.Model',
	config: {
		proxy: {
			type: 'localstorage',
			id: 'patients'
		},
		fields: [{
			name: 'registrationNumber',
			type: 'string'
		},
		{
			name: 'firstName',
			type: 'string'
		},
		{
			name: 'lastName',
			type: 'string'
		},
		{
			name: 'guardianFirstName',
			type: 'string'
		},
		{
			name: 'guardianLastName',
			type: 'string'
		},
		{
			name: 'gender',
			type: 'string'
		},
		{
			name: 'dateOfBirth',
			type: 'date'
		},
		{
            // TODO: remove age? Shouldnt need age and dateOfBirth
            name: 'age',    
			type: 'int'
		},
		{
			name: 'education',
			type: 'string'
		},
		{
			name: 'caste',
			type: 'string'
		}
		//{
		//	name: 'occupation',
		//	type: 'string'
		//}
    ]
	}
});

