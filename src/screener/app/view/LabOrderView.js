/**
 * This screen shows a list of patients on the left side,
 * with a button to sort them. The right side shows a Lab Order Form    
 */
Ext.define("Screener.view.LabOrderView", {
    extend: 'Ext.Container',

    id: 'labOrderView',

    requires: ['Screener.view.LabOrderForm'],
    xtype: 'labOrder',

    config: {
        layout: 'hbox',
        title: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabOrderView.alo'),
        items: [
        //our patient list is built on the Patients store, and has a title and sort button
        {
            xtype: 'patientListView',
            flex: 1
        }, {
            xtype: 'labOrderForm',
            flex: 1
        }]
    }
});
