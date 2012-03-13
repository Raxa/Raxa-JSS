Ext.Loader.setConfig({
	enabled: true
});

Ext.application({
	name: 'RaxaEmr.Registration',
	controllers: ['Main'],
	views: ['Home', 'Register', 'Search', 'Bmi', 'PatientScreen1', 'PatientScreen2', 'Viewport'],
    models: ['Search','Patient'], // TODO: Remove temp 'Search' model

	launch: function() {
		Ext.create('RaxaEmr.Registration.view.Viewport');
	}
});

