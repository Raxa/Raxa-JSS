/**
 * This screen shows a list of patients on the left side,
 * with a button to sort them. The right side shows a drug order    *  form
 */
Ext.define("Screener.view.PharmacyView", {
    extend: 'Ext.Container',
    id: 'pharmacyView',
    requires: ['Screener.view.PharmacyForm'],
    xtype: 'pharmacylist',
    config: {
        layout: 'hbox',
        title: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.PharmacyView.add_d'),
        style: 'background:#96d2f7',
        items: [
        //our patient list is built on the Patients store, and has a title and sort button
        {
            xtype: 'patientListView',
            flex: 1
        }, {
            xtype: 'pharmacyForm',
            flex: 1
        }]
    }
});
