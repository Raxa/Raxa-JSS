Ext.define('RaxaEmr.Screener.view.Info', {
	extend: 'Ext.Carousel',
	xtype: 'infopage',

	config: {
		title: 'Patient Information',
		iconCls: 'star',

		items: [{
			xclass: 'RaxaEmr.Screener.view.patientinfo'
		}
		]
	}
});

