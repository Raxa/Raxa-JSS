Ext.define('RaxaEmr.Screener.view.patientinfo', {
	extend: 'Ext.form.Panel',
	id: 'PatientInfoForm',

	config: {
		title: 'Patients Summary',
		styleHtmlContent: true,
		xtype: 'patientScreen1',
		Autoscroll: 'true',



		// List takes a store and a template
		items: [{
			xtype: 'fieldset',
			title: 'Patient Summary',
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
				label: 'Sex',
				name: 'gender',
			},
		
			{
				xtype: 'field',
				label: 'Age',
				name: 'age',
			
			},
			{
				xtype: 'field',
				label: 'BMI',
				name: 'bmi',
				
			},
			{
				xtype: 'field',
				name: 'id#',
				label: 'ID#',
							},
{
				xtype: 'field',
				name: 'village',
				label: 'Village',
							},
{
				xtype: 'field',
				name: 'district',
				label: 'District',
							},
	{
				// TODO: show patient file
				xtype: 'button',
				text: 'View Patient File',
				action: 'viewPatientFile'
			}
			]
		}]
	}
});

