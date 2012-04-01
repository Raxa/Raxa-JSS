Ext.Loader.setConfig({
	enabled: true
});

Ext.application({
	name: 'RaxaEmr.Screener',
	controllers: ['Main'],
	views: ['Home', 'Register','PatientInfo', 'PatientScreen1', 'PatientScreen2', 'Viewport','DoctorList'],
    	models: ['Patient'], 

	launch: function() {
		Ext.create('RaxaEmr.Screener.view.Viewport');
	}
});

