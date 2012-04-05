Ext.Loader.setConfig({
	enabled: true
});

Ext.application({
	name: 'RaxaEmr.Screener',
	controllers: ['Main'],
	views: ['Home', 'Info','patientinfo','Viewport'],
    models: ['Patient'], 

	launch: function() {
		Ext.create('RaxaEmr.Screener.view.Viewport');
	}
});

