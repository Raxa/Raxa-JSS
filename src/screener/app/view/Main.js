/*
 * This class defines our main view with navigation.View
 * to allow for easy switching between screens, a back button, etc.
 */

Ext.define("Screener.view.Main", {
    extend: 'Ext.Container',
	xtype: 'mainView',
	id: "mainView",
        
	config: {
		layout: {
			type: 'card'
		},
        fullscreen: true,
		items: [{
			xclass: 'Screener.view.TopMenu'
        },{
            xclass: 'Screener.view.PatientView'
        },{
            xclass: 'Screener.view.VitalsView'
        },{
            xclass: 'Screener.view.PharmacyView'
        },{
	        xclass: 'Screener.view.LabOrderView' 
        }]
	}
});
