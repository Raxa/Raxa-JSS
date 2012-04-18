/*
 * This screen shows a list of patients 
 */
Ext.define("Screener.view.PatientList", {
    extend: 'Ext.List',
    xtype: 'patientListView',
    items: [{
        xtype: 'titlebar',
        docked: 'top',
        title: 'Patients',
        items: [{
            xtype: 'button',
            text: 'Sort',
            id: 'sortButton',
            align: 'left'
        }]
    }],
});