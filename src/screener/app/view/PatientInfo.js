Ext.define('RaxaEmr.Screener.view.PatientInfo', {
	extend: 'Ext.Container',
	xtype: 'patientprofile_',
	id: 'patientprofile_',

	config: {
		title: 'Patient Profile',
		iconCls: 'user',
		styleHtmlContent: true,

		items: [{
			xtype: 'fieldset',
			title: 'Patient Basic Information',
			align: 'center',
			centered: true,
			items: [{
				xtype: 'textfield',
				 label: 'Patient ID',
   				 placeHolder: 'IDXXXXXXX'
			},
			{
				xtype: 'textfield',
				 label: 'Patient Name',
   				 placeHolder: 'From Database'
				
			},
			{
				xtype: 'textfield',
				label: 'Father/Husband First Name',
				name: 'guardianFirstName',
				 placeHolder: 'From Database'
			},
			{
				xtype: 'textfield',
				label: 'Gender',
   				placeHolder: 'Male'
				
			},
			{
				xtype: 'textfield',
				label: 'Eductation',
   				placeHolder: 'Not educated'
			},
			{
				xtype: 'textfield',
				label: 'Caste',
   				placeHolder: 'First'
				
			},
			{
				xtype: 'textfield',
				label: 'Date',
   				placeHolder: 'MM/DD/YYYY'
			},
			{
				xtype: 'textfield',
				label: 'Address',
				placeHolder: 'From Database'
			},
			{
				xtype: 'textfield',
				label: 'Contact me via phone',
				placeHolder: 'Yes'
			},
			{
				xtype: 'textfield',
				label: 'Phone',
				placeHolder: 'From Database'
			},			
			
			{
				xtype: 'button',
				text: 'OK',
			
			}]
		}]










		
	}
});

