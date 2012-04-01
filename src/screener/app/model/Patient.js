Ext.define('RaxaEmr.Screener.model.Patient', {
	extend: 'Ext.data.Model',
	config: {
		proxy: {
			type: 'localstorage',
			id: 'patients'
		},

	}
});

