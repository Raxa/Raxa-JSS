var patientStore = Ext.create('Ext.data.Store', {
	model: "RaxaEmr.Registration.model.Patient"
});

var patientSearchResults = new Ext.DataView({
	store: patientStore,
	tpl: '<tpl for="."><img src="{firstName}" /></tpl>',
	collectData: function() {
		var data = this.callParent(arguments);
		return Ext.Array.slice(data, 0, 5);
	}
});

