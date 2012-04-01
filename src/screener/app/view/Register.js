Ext.define('RaxaEmr.Screener.view.Register', {
	extend: 'Ext.Carousel',
	xtype: 'drugorderpage',

	config: {
		title: 'Drug Order',
		iconCls: 'star',

		items: [{
			xclass: 'RaxaEmr.Screener.view.PatientScreen1'
		},
		
		{
            html: 'Confirmation Screen'
		}]
	}
});

