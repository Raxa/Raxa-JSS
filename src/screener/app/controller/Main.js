var patientStore;

Ext.define('RaxaEmr.Screener.controller.Main', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
		}
	},

	init: function() {
		
	},

	initializePatientStore: function() {
		console.log('initializePatientStore');
		//our Store automatically picks up the LocalStorageProxy defined on the
		//Patient model
		patientStore = Ext.create('Ext.data.Store', {
			model: "RaxaEmr.Screener.model.Patient"
		});
	},

});

