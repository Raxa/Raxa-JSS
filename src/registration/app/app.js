Ext.Loader.setConfig({
	enabled: true
});

Ext.application({
	name: 'RaxaEmr.Registration',
	controllers: ['Main'],
	views: ['Home', 'Register', 'Search', 'Bmi', 'PatientScreen1', 'PatientScreen2', 'RestWebServiceTest','Viewport' ],
    models: ['Patient','BMI','RestWebServiceTestModel'], 

	launch: function() {
		Ext.create('RaxaEmr.Registration.view.Viewport');
	}
});

