Ext.define('RaxaEmr.Registration.view.PatientScreen2', {
	extend: 'Ext.Container',

	config: {
		title: 'Patient Communication Information',
		styleHtmlContent: true,
		xtype: 'patientScreen2',
		autoscroll: true,

		items: [{
			xtype: 'fieldset',
			title: 'Patient Communication Information',
			align: 'center',
			centered: true,
			items: [{
				xtype: 'textfield',
				label: 'Block/House/Door #',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Street/Area/Locality/Mohalla/Road',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Town/Village/City',
				required: true
			},
			{
				xtype: 'textfield',
				label: 'Post Office',
				required: false
			},
			{
				xtype: 'textfield',
				label: 'Tehsil/Taluka/Mandal/Thana',
				required: false
			},
			{
				xtype: 'textfield',
				label: 'District',
				required: false
			},
			{
				xtype: 'selectfield',
				label: 'Contact me via phone',
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
				label: 'Primary Phone'
			},
			{
				xtype: 'textfield',
				label: 'Secondary Phone'
			}]
		}]
	}
});

