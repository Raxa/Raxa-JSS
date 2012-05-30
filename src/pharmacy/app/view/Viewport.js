Ext.define('Pharmacy.view.Viewport', {
	extend: 'Ext.container.Viewport',
	layout: 'fit',
	items: [{
        xtype: 'dispenseView',
        title: 'Drug Dispense in this package'
    }]
});
