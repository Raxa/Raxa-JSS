/**
 * This screen shows a list of patients 
 */
Ext.define("Screener.view.PatientListView", {
    xtype: 'patientListView',
    extend: 'Ext.Container',
    alias: 'widget.ListView',
    requires: [
    'Screener.store.NewPatients'
    ],

    config: {
        layout: 'hbox',
        title: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.PatientListView.pat_ass'),

        items: [
        //our patient list is built on the Patients store, and has a title and sort button
        {
            xtype: 'list',
            itemId: 'patientList',
            allowDeselect: true,
            itemTpl: [
                '<table>',
                '<tr><td>',
                '<img src="{image}" width=48 height=48 />',
                '</td>',
                '<td>',
                '{display}<br>Gender: {gender} Age: {age}<br>BMI: {bmi}<br>Complaint: {complaint}',
                '</td></tr>',
                '</table>',
            ].join(''),
            store: 'patientStore',
            items: [{
                xtype: 'titlebar',
                itemId: 'patientsWaiting',
                docked: 'top',
                title: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.PatientListView.pat'),
                items: [{
                    xtype: 'button',
                    text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.PatientListView.bmi'),
                    itemId: 'sortBMI',
                    action: 'sortByBMI',
                    align: 'left'
                }, {
                    xtype: 'button',
                    text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.PatientListView.fifo'),
                    itemId: 'sortFIFO',
                    action: 'sortByFIFO',
                    align: 'left'
                }, {
                    xtype: 'button',
                    text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.PatientListView.name'),
                    itemId: 'sortName',
                    action: 'sortByName',
                    align: 'left'
                }, 
                {
                    xtype: 'button',
                    itemId: 'addPatientButton',
                    text: 'Add Patient',
                    align: 'right'
                },
                {
                    xtype: 'button',
                    text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.PatientListView.refresh'),
                    itemId: 'refreshButton',
                    action: 'refreshList',
                    align: 'right'
                },
                ]
            }],
            flex: 1
            
        }]
    }
});
