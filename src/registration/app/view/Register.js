Ext.define('RaxaEmr.Registration.view.Register', {
	extend: 'Ext.form.Panel',
	xtype: 'registerpage',
	id: 'createPatientForm',
	

	config: {
		title: 'Registration',
		iconCls: 'star',
		scroll: 'vertical',
		pinHeaders: true,
		layout:{
			type: 'vbox',
			align:'middle'
		},

		items: [{
			xtype: 'fieldset',
			title: 'Patient Registration',
			align: 'center',
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
				xtype: 'textfield',
				label: 'Block/House/Door #',
				name: 'block#',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Street/Area/Locality/Mohalla/Road',
				name: 'street',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Town/Village/City',
				name: 'town',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Post Office',
				name: 'postOffice',
				required: false
			},
			{
				xtype: 'textfield',
				label: 'Tehsil/Taluka/Mandal/Thana',
				name: 'tehsil',
				required: false
			},
			{
				xtype: 'textfield',
				label: 'District',
				name: 'district',
				required: false
			},
			{
				xtype: 'selectfield',
				label: 'Contact me via phone',
				name: 'contactViaPhone',
				options: [{
					text: 'Yes',
					value: 'yes'
				},
				{
					text: 'No',
					value: 'no'
				}]
			},
			{
				xtype: 'textfield',
				label: 'Primary Phone',
				name: 'primaryPhone'
			},
			{
				xtype: 'textfield',
				label: 'Secondary Phone',
				name: 'secondaryPhone'
			},
			{
				xtype: 'button',
				text: 'Create Patient',
				action: 'createPatient'
			}]
		}]
	}
});

