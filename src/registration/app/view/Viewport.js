Ext.define('RaxaEmr.Registration.view.Viewport', {
	extend: 'Ext.TabPanel',
	config: {
		fullscreen: true,
		tabBarPosition: 'bottom',

		items: [{
			xtype: 'homepanel' // view/Home.js
		},
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
	}
});

