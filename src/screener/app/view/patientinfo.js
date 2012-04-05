Ext.define('RaxaEmr.Screener.view.patientinfo', {
	extend: 'Ext.form.Panel',
	id: 'PatientInfoForm',

	config: {
		title: 'Patients Information',
		styleHtmlContent: true,
		xtype: 'patientScreen1',
		Autoscroll: 'true',



		// List takes a store and a template
		items: [{
			xtype: 'fieldset',
			title: 'Patient Information',
			align: 'center',
			centered: true,
			items: [{
				xtype: 'field',
minWidth:400,
				label: 'First Name',

 				name: 'firstName',
				
			},
			{
				xtype: 'field',
				label: 'Last Name',
				name: 'lastName',
				
			},
			{
				xtype: 'field',
				label: 'Father/Husband First Name',
				name: 'guardianFirstName',
				
			},
			{
				xtype: 'field',
				label: 'Father/Husband Last Name:',
				name: 'guardianLastName',
			
			},
			{
				xtype: 'field',
				label: 'Sex',
				name: 'gender',
							},
			{
				xtype: 'field',
				label: 'Education',
				name: 'education',
			
			},
			{
				xtype: 'field',
				label: 'Date of Birth:',
				name: 'dateOfBirth',
				
			},
			{
				xtype: 'field',
				name: 'caste',
				label: 'Caste',
							},
			]
		}]
	}
});

