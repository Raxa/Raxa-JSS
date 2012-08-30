/**
 * This screen defines the main menu buttons for:
 * Add New Patient
 * Assign Patients to Doctors
 * Add Patient Vitals
 * Add Pharmacy order
 * Add Lab Order
 */
Ext.define("Screener.view.TopMenu", {
    extend: 'Ext.Container',
    xtype: 'topmenu',
    config: {
        layout: 'vbox',
        /*centered: true,*/
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
            text: 'Assign Patients to Doctors',
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'button',
            id: 'showVitalsButton',
            text: 'Add Patient Vitals',
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'button',
            id: 'showPharmacyButton',
            text: 'Add Pharmacy Order',
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'button',
            id: 'showLabButton',
            text: 'Add Lab Order',
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
