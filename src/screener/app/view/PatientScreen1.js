Ext.define('RaxaEmr.Screener.view.PatientScreen1', {
	extend: 'Ext.form.Panel',
	id: 'createPatientForm',

	config: {
		title: 'Drug Request Form',
		styleHtmlContent: true,
		xtype: 'patientScreen1',
		autoscroll: true,

		// List takes a store and a template
		items: [{
			xtype: 'fieldset',
			title: 'Drug Request Form',
			align: 'center',
			centered: true,
			items: [
			
				
			
			{
				xtype: 'selectfield',
				label: 'Drug Name',
				name: 'drugname',
				required: true,
				options: [{
					text: 'Celebrex',
					value: 'drugname1'
				},
				{
					text: 'All other will be fetched',
					value: 'drugname2'
				},
				{
					text: 'from the database',
					value: 'drugname3'
				}]
			},
			{
				xtype: 'selectfield',
				label: 'Quantity',
				name: 'quantity',
				required: true,
				options: [{
					text: '1',
					value: '1'
				},
				{
					text: '2',
					value: '2'
				},
				{
					text: '3',
					value: '3'
				},
				{
					text: '4',
					value: '4'
				},
				{
					text: 'I suggest this to be text field',
					value: 'I suggest this to be text field'
				}]
			},
			
						
			{
				xtype: 'selectfield',
				label: 'Frequency',
				name: 'frequency',
				required: true,
				options: [{
					text: 'Daily',
					value: '1'
				},
				{
					text: 'Weekly',
					value: '2'
				},
				{
					text: 'Fortnightly',
					value: '3'
				},
				{
					text: 'Monthly',
					value: '4'
				},
				]
				
			},
			
						{
				xtype: 'selectfield',
				label: 'Duration',
				name: 'duration',
				required: true,
				options: [{
					text: 'One Week',
					value: '1'
				},
				{
					text: 'One Week',
					value: '2'
				},
				{
					text: '15 Days',
					value: '3'
				},
				{
					text: 'One Month',
					value: '4'
				},
				]
				
			},		
				// TODO: temporary submit button
			{	xtype: 'button',
				text: 'Submit Request',
				action: 'submit Request'
			}]
		}]
	}
});

