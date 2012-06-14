/**
 * This screen shows a list of patients 
 */
Ext.define("Screener.view.PatientListView", {
    xtype: 'patientListView',

    extend: 'Ext.Container',

    config: {
        layout: 'hbox',
        title: 'Patient Assignments',
        items: [
        //our patient list is built on the Patients store, and has a title and sort button
        {
            xtype: 'list',
            id: 'patientList',
            itemTpl: '{lastname}, {firstname} <br>BMI: {bmi}',
            store: Ext.create('Screener.store.Patients', {
                storeId: 'patientStore'
            }),
            items: [{
                xtype: 'titlebar',
                docked: 'top',
                id: 'patientsWaiting',
                title: 'Patients',
                items: [{
                    xtype: 'button',
                    text: 'Sort',
                    id: 'sortButton',
                    align: 'left'
                }]
            }],
            flex: 1
        }]
    }
});