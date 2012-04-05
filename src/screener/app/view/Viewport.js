Ext.define('RaxaEmr.Screener.view.Viewport', {
	extend: 'Ext.TabPanel',
	config: {
		fullscreen: true,
		tabBarPosition: 'bottom',

		items: [
		{
			xtype: 'infopage' 
		}
		    ]
	}
});

