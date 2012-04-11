Ext.define('RaxaEmr.Registration.view.RestWebServiceTest', {
	extend: 'Ext.Container',
	xtype: 'RestWebServiceTestPage',
	id: 'RestWebServiceTest',
	
	config: {
		title: 'REST Test',
		styleHtmlContent: true,
		autoscroll: true,
		iconCls: 'user',
		
		
		items: [{
			id: 'RestWebServiceTestPanel',
			xtype: 'fieldset',
			title: 'Rest Web Service Test',
			align: 'center',
			centered: true,
			items: [{
 				xtype: 'label',
    				html: 'Rest Mockup Page'
    			
				},
			
//Rest will be tested on this page.
			
			
//https://wiki.openmrs.org/display/projects/Web+Service+1.0+User+Stories
//		{
//			var cb = new Ext.form.ComboBox
//			({
// 			store: new Ext.data.Store({
// 			proxy: new Ext.data.HttpProxy({
//  			url: '/openmrs/ws/rest/v1/person?q=John',
//   			method: 'GET',
//  			params: {
//				query: ''
//  				}
//  							}),
 		//	reader: new Ext.data.JsonReader({
 		//	fields: ['id']
//			 })
//						})
		
 		//	displayField: 'id',
 		//	valueField: 'id',
 		//	triggerAction: 'all',
		//	renderTo: document.body
//						})
				

//		}
			]
			}]		
	}
});

