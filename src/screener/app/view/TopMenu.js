/**
 * This screen defines the main menu buttons for:
 * Add a Patient,
 * Show Patients,
 * Show Doctors
 */
Ext.define("Screener.view.TopMenu", {
    extend: 'Ext.Container',
    xtype: 'topmenu',
    id: 'mainView',
    config: {
        fullscreen: true,
        layout: 'vbox',
        centered: true,
        items: [{
            xtype: 'button',
            id: 'addPatientButton',
            text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.TopMenu.add_newp'),
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'button',
            id: 'showPatientsButton',
            text:Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.TopMenu.show_unassp') ,
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'button',
            id: 'showPharmacyButton',
            text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.TopMenu.phar_ord'),
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'button',
            id: 'showLabButton',
            text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.TopMenu.lab_ord'),
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'loadmask',
            message: 'Loading',
            id: 'loadMask'	
        }]
    }
});