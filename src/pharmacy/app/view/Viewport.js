Ext.define('RaxaEmr.Pharmacy.view.Viewport', {
	extend: 'Ext.container.Viewport',
	layout: 'fit',
	items: [{
        xtype: 'prescription',
        title: 'Drug Prescription in this package'
    }]
});
