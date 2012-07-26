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
            text: 'Add New Patient',
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'button',
            id: 'showPatientsButton',
            text: 'Show Unassigned Patients',
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'button',
            id: 'showDoctorsButton',
            text: 'Show Doctors',
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'button',
            id: 'showPharmacyButton',
            text: 'Pharmacy Order',
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'button',
            id: 'showLabButton',
            text: 'Lab Order',
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