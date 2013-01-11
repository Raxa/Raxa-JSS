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
        // TODO:
        // scroll: false,
        layout: 'hbox',
        title: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsView.add_vit'),
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
