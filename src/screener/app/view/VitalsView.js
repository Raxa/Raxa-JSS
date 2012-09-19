/**
 * This screen shows a list of patients on the left side,
 * with a button to sort them. The right side shows a drug order    *  form
 */
Ext.define("Screener.view.VitalsView", {
    extend: 'Ext.Container',
    id: 'vitalsView',
    requires: ['Screener.view.VitalsForm'],
    xtype: 'vitalslist',
    config: {
        layout: 'hbox',
        title: 'Add Vitals',
        style: 'background:#96d2f7',
        items: [
        //our patient list is built on the Patients store, and has a title and sort button
        {
            xtype: 'patientListView',
            id: 'vitalsPatientList',
            flex: 1
        }, {
            xtype: 'vitalsForm',
            flex: 1
        }]
    }
});
