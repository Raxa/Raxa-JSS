Ext.define('RaxaEmr.Registration.view.PatientConfirm', {
	extend: 'Ext.form.Panel',
    xtype: 'patientconfirm',
	id: 'confirmPatientForm',

	config: {
		title: 'Registration Confirm',
		scroll: 'vertical',
		pinHeaders: true,
		fullscreen: true,
		layout:{
			type: 'vbox',
			align:'middle',
		},
		items:[{
			xtype: 'toolbar',
			docked: 'top',
			items: [{
				text: 'Edit',
				itemId: 'backBtn',
				ui: 'back',
				handler: 'backtoEdit'
			},{
				xtype: 'title',
				title: 'Confirm Details',
				centered: true
			}],
			},{
					items: [{
						xtype: 'fieldset',
						title: 'Patient Registration',
						align: 'center',
						id: 'set1',
						items: [{
							xtype: 'textfield',
							label: 'First Name',
							name: 'firstName',
							id: 'firstname',
							readOnly: true
						},
						{
							xtype: 'textfield',
							label: 'Last Name',
							name: 'lastName',
							id: 'lastname',
							readOnly: true
						},
						{
							xtype: 'textfield',
							label: 'Father/Husband First Name',
							name: 'guardianFirstName',
							id: 'guardianfirstname',
							readOnly: true
						},
						{
							xtype: 'textfield',
							label: 'Father/Husband Last Name:',
							name: 'guardianLastName',
							id: 'guardianlastname',
							readOnly: true,
							clearIcon: true
						},
						{
							xtype: 'selectfield',
							label: 'Sex',
							name: 'gender',
							id: 'gender',
							readOnly: true,
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
							id: 'education',
							readOnly: true,
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
							id: 'dob',
							readOnly: true,
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
							id: 'caste',
							displayField: 'desc',
							readOnly: true,
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
							id: 'block',
							readOnly: true
						},
						{
							xtype: 'textfield',
							label: 'Street/Area/Locality/Mohalla/Road',
							name: 'street',
							id: 'street',
							readOnly: true
						},
						{
							xtype: 'textfield',
							label: 'Town/Village/City',
							name: 'town',
							id: 'town',
							readOnly: true
						},
						{
							xtype: 'textfield',
							label: 'Post Office',
							name: 'postOffice',
							id: 'postoffice',
							readOnly: true
						},
						{
							xtype: 'textfield',
							label: 'Tehsil/Taluka/Mandal/Thana',
							name: 'tehsil',
							id: 'tehsil',
							readOnly: true
						},
						{
							xtype: 'textfield',
							label: 'District',
							name: 'district',
							id: 'district',
							readOnly: true
						},
						{
							xtype: 'selectfield',
							label: 'Contact me via phone',
							name: 'contactViaPhone',
							id: 'contactviaphone',
							readOnly: true,
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
							id: 'primaryphone',
							readOnly: true
						},
						{
							xtype: 'textfield',
							label: 'Secondary Phone',
							name: 'secondaryPhone',
							id: 'secondaryphone',
							readOnly: true
						},
						{
							xtype: 'button',
							text: 'Confirm',
							action: 'confirmPatient'
						}]
					}]
			}]
	}
});

