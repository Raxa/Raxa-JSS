Ext.define('RaxaEmr.Registration.view.PatientScreen1', {
	extend: 'Ext.form.Panel',
	id: 'createPatientForm',

	config: {
		title: 'Patient Profile Information',
		styleHtmlContent: true,
		xtype: 'patientScreen1',
		autoscroll: true,

		// List takes a store and a template
		items: [{
			xtype: 'fieldset',
			title: 'Patient Basic Information',
			align: 'center',
			centered: true,
			items: [{
				xtype: 'textfield',
				label: 'First Name',
				name: 'firstName',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Last Name',
				name: 'lastName',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Father/Husband First Name',
				name: 'guardianFirstName',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Father/Husband Last Name:',
				name: 'guardianLastName',
				required: true,
				clearIcon: true
			},
			{
				xtype: 'selectfield',
				label: 'Sex',
				name: 'gender',
				options: [{
					text: 'Male',
					value: 'male'
				},
				{
					text: 'Female',
					value: 'female'
				},
				{
					text: 'Other',
					value: 'other'
				}]
			},
			{
				xtype: 'selectfield',
				label: 'Education',
				name: 'education',
				options: [{
					text: 'Not educated',
					value: 'notEducated'
				},
				{
					text: '5th Pass or less',
					value: 'lessThanOrEqualTo5'
				},
				{
					text: '6th - 9th Standard',
					value: '6To9'
				},
				{
					text: '10th Standard and above',
					value: '10AndAbove'
				},
				{
					text: 'Graduate and above',
					value: 'graduate'
				}]
			},
			{
				xtype: 'datepickerfield',
				label: 'Date of Birth:',
				name: 'dateOfBirth',
				value: new Date(),
				picker: {
					yearFrom: 1930
				},
				clearIcon: true
			},
			{
				xtype: 'selectfield',
				name: 'caste',
				label: 'Caste',
				placeHolder: 'Select Caste',
				displayField: 'desc',
				options: [{
					desc: 'First',
					value: 'first'
				},
				{
					desc: 'Second',
					value: 'second'
				},
				{
					desc: 'Third',
					value: 'third'
				},
				{
					desc: 'Fourth',
					value: 'fourth'
				},
				{
					desc: 'Fifth',
					value: 'fifth'
				}]
			},
			{
				// TODO: temporary submit button
				xtype: 'button',
				text: '(Temp Button) create Patient',
				action: 'createPatient'
			}]
		}]
	}
});

