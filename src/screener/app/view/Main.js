/*
 * This class defines our main view with navigation.View
 * to allow for easy switching between screens, a back button, etc.
 */
Ext.define("Screener.view.Main", {
        /*extend: 'Ext.Container',*/
        extend: 'Ext.NavigationView',
	requires: ['Screener.view.TopMenu', 'Screener.view.LabOrderView', 'Screener.view.PharmacyView', 'Screener.view.PatientView', 'Screener.view.VitalsView'],
	xtype: 'mainView',
	id: "mainView",
	config: {
		layout: {
			type: 'card'
		},
        fullscreen: true,

		activeItem: 0,
		// Don't delete views so we can switch screens quickly
		autoDestroy: false,

		items: [{
			xclass: 'Screener.view.TopMenu'
            /*},*/
            /*{*/
            /*xclass: 'Screener.view.PatientView'*/
            /*},*/
            /*{*/
            /*xclass: 'Screener.view.PharmacyView'*/
            /*},*/
            /*{*/
            /*xclass: 'Screener.view.LabOrderView'*/
            /*},*/
            /*{*/
            /*xclass: 'Screener.view.VitalsView'*/
		}]
	}
});

