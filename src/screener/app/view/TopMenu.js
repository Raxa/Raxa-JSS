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
            text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.TopMenu.add_newp'),
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'button',
            id: 'showPatientsButton',
            text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.TopMenu.show_ptd'),
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'button',
            id: 'showVitalsButton',
            text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.TopMenu.add_pv'),
            ui: 'round',
            height: 80,
            width: 300
        }, {
            xtype: 'button',
            id: 'showPharmacyButton',
            text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.TopMenu.add_po'),
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
            message: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.TopMenu.loading'),
            id: 'loadMask'	
        }]
    }
});
