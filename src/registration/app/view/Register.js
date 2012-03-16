Ext.define('RaxaEmr.Registration.view.Register', {
	extend: 'Ext.Carousel',
	xtype: 'registerpage',

	config: {
		title: 'Registration',
		iconCls: 'star',

		items: [{
			xclass: 'RaxaEmr.Registration.view.PatientScreen1'
		},
		{
			xclass: 'RaxaEmr.Registration.view.PatientScreen2'
		},
		{
            html: 'Confirmation Screen'
		}]
	}
});

