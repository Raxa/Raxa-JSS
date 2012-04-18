/*
 * This screen shows a list of patients on the left side,
 * with a button to sort them. The right side shows a drug order    *  form
 */
Ext.define("Screener.view.PharmacyView", {
    extend: 'Ext.Container',
    id: 'pharmacyView',
    requires: ['Screener.view.PharmacyForm'],
    xtype: 'pharmacylist',
    config: {
        fullscreen: true,
        layout: 'hbox',
        title: 'Patient Assignments',
        items: [
        //our patient list is built on the Patients store, and has a title and sort button
        {
            xtype: 'patientListView',
            store: Ext.create('Screener.store.Patients', {
                storeId: 'patientStore'
            }),
            itemTpl: '{lastname}, {firstname}',
            flex: 1
        }, {
            xtype: 'pharmacyForm',
            flex: 1
        }]
    }
});