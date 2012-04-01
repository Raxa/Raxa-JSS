Ext.define('RaxaEmr.Screener.view.PatientScreen2', {
	extend: 'Ext.Container',
	xtype: 'laborder',
	id: 'laborder_',
	
	config: {
		title: 'Laboratory Order',
		styleHtmlContent: true,
		iconCls: 'star',
	
		fullscreen: true,
	
		autoscroll: true,
		items: [{
			xtype: 'fieldset',
			title: 'Drug Request Form',
		//	align: 'center',
			centered: true,
			items: [
			{
				xtype: 'textfield',
				 label: 'Patient ID',
   				 placeHolder: 'IDXXXXXXX'
			},
				
			
			{
				xtype: 'selectfield',
				label: '',
				name: 'drugname',
				required: true,
				options: [{
					text: 'Individual Test',
					value: ''
				}]
			},
			
      			      
           			     
						
				{
						xtype: 'checkboxfield',
						name : 'addadditionaltest',
						label: 'Add Test',
						value: '0',
						
      				 },
			
					{
						xtype: 'checkboxfield',
						name : 'urgent',
						label: 'Urgent',
						value: '0',
						
      				 },
				
				// TODO: temporary submit button
			{	xtype: 'button',
				text: 'Submit Request',
				action: 'submit Request'
			}]
		}]
		
	}
});

