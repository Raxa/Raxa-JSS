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
			align:'middle',
		},
		

		items: [{
			xtype: 'fieldset',
			title: 'Patient Registration',
			align: 'center',
			items: [{
				xtype: 'textfield',
				label: 'First Name',
				name: 'firstName',
				id: 'firstnameregister',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Last Name',
				name: 'lastName',
				id: 'lastnameregister',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Father/Husband First Name',
				name: 'guardianFirstName',
				id: 'guardianfirstnameregister',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Father/Husband Last Name:',
				name: 'guardianLastName',
				id: 'guardianlastnameregister',
				required: true,
				clearIcon: true
			},
			{
				xtype: 'selectfield',
				label: 'Sex',
				name: 'gender',
				id: 'genderregister',
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
				id: 'educationregister',
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
				id: 'dobregister',
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
				id: 'casteregister',
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
				id: 'blockregister',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Street/Area/Locality/Mohalla/Road',
				name: 'street',
				id: 'streetregister',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Town/Village/City',
				name: 'town',
				id: 'townregister',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Post Office',
				name: 'postOffice',
				id: 'postofficeregister',
				required: false
			},
			{
				xtype: 'textfield',
				label: 'Tehsil/Taluka/Mandal/Thana',
				name: 'tehsil',
				id: 'tehsilregister',
				required: false
			},
			{
				xtype: 'textfield',
				label: 'District',
				name: 'district',
				id: 'districtregister',
				required: false
			},
			{
				xtype: 'selectfield',
				label: 'Contact me via phone',
				name: 'contactViaPhone',
				id: 'contactviaphoneregister',
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
				name: 'primaryPhone',
				id: 'primaryphoneregister'
			},
			{
				xtype: 'textfield',
				label: 'Secondary Phone',
				name: 'secondaryPhone',
				id: 'secondaryphoneregister'
			},
			{
				xtype: 'button',
				text: 'Create Patient',
				action: 'createPatient'
				
			}]
		}]
	}
});
