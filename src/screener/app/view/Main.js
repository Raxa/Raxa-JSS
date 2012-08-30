/*
 * This class defines our main view with navigation.View
 * to allow for easy switching between screens, a back button, etc.
 */
Ext.define("Screener.view.Main", {
    extend: 'Ext.NavigationView',
	requires: ['Screener.view.TopMenu', 'Screener.view.LabOrderView', 'Screener.view.PharmacyView', 'Screener.view.PatientView', 'Screener.view.VitalsView'],
	xtype: 'mainView',
	id: "mainView",
	config: {
		layout: {
			type: 'card'
		},
        fullscreen: true,
		items: [{
			xclass: 'Screener.view.TopMenu'
		}]
	}
});

