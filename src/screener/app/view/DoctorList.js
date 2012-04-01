Ext.define('RaxaEmr.Screener.view.DoctorList', {
	extend: 'Ext.Container',
	xtype: 'doclist',
	id: 'doclist',
	
	config: {
		title: 'Doctor List',
		styleHtmlContent: true,
		xtype: 'patientScreen1',
		autoscroll: true,
		iconCls: 'user',

		// List takes a store and a template
		items: [{
			xtype: 'fieldset',
			title: 'Drug Request Form',
			align: 'center',
			centered: true,
			items: [
			
				
			
			{
				xtype: 'textfield',
		                label: 'Doctor Name',
   				placeHolder: 'Dr. Ram Kataria'
			},
			
			{
				xtype: 'textfield',
		                label: 'Patients',
   				placeHolder: '0',
   				setMinWidth: '1050'
	
			},

{
				xtype: 'textfield',
		                label: 'Doctor Name',
   				placeHolder: 'Dr. Yogesh Jain'
			},
			
			{
				xtype: 'textfield',
		                label: 'Patients',
   				placeHolder: '14'
	
			},
			
			
			{
				xtype: 'textfield',
		                label: 'Doctor Name',
   				placeHolder: 'Dr. Test Test'
			},
			
			{
				xtype: 'textfield',
		                label: 'Patients',
   				placeHolder: '0'
	
			},
			
			{
				xtype: 'textfield',
		                label: 'Doctor Name',
   				placeHolder: 'Dr. Test Test'
			},
			
			{
				xtype: 'textfield',
		                label: 'Patients',
   				placeHolder: '0'
	
			},

			
			]
		}]
	}
});

