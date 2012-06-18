Ext.define('RaxaEmr.Pharmacy.view.Viewport', {
	extend: 'Ext.container.Viewport',
	layout: 'fit',
	items: [{
        xtype: 'Dispense',
        title: 'Drug Dispense in this package'
    }]
});
