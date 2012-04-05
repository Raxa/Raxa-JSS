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
		},
		{
			name: 'block#',
			type: 'string'
		},
		{
			name: 'street',
			type: 'string'
		},
		{
			name: 'town',
			type: 'string',
		},
		{
			name: 'postOffice',
			type: 'string'
		},
		{
			name: 'tehsil',
			type: 'string'
		},
		{
			name: 'district',
			type: 'string'
		},
		{
			name: 'contactViaPhone',
			type: 'string'
		},
		{
			name: 'primaryPhone',
			type: 'string'
		},
		{
			name: 'secondaryPhone',
			type: 'string'
		}		
		//{
		//	name: 'occupation',
		//	type: 'string'
		//}
    ]
	}
});

