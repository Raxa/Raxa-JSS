Ext.define('RaxaEmr.Registration.view.Viewport', {
	extend: 'Ext.Container',
	id: 'viewer',
	config: {
		fullscreen: true,
		layout:{
			type: 'card'
		},
		items:[{
				xtype: 'tabpanel', 
				tabBarPosition: 'bottom',
				id: 'mainview',
				items: [
				{
					xtype: 'registerpage' // view/Register.js
				},
				{
					xtype: 'searchpage' // view/Search.js
				},
				{
					xtype: 'bmipage' // view/Bmi.js
				}
				]
			},{
				xtype: 'patientconfirm',
			}
		]
	}
});
