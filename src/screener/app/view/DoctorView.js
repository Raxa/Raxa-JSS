/**
 * This screen shows a list of doctors on the left side,
 * and the current doctor's waiting list on the right side.
 * Right side also has buttons for removing patients from
 * the doctor's waiting list.
 */
Ext.define("Screener.view.DoctorView", {
    requires: ['Screener.store.Doctors', 'Ext.dataview.List', 'Ext.Panel'],
    extend: 'Ext.Container',
    xtype: 'doctorList',
    config: {
        fullscreen: true,
        layout: 'hbox',
        title: 'Waiting Lists',
        items: [{
            xtype: 'list',
            id: 'expandDoctorList',
            //regular expression to display doctor information
            itemTpl: '({numpatients})Dr. {firstname} {lastname} ',
            //our doctor list uses the Doctors store already instantiated in PatientView
            store: 'doctorStore',

            items: [{
                xtype: 'titlebar',
                docked: 'top',
                title: 'Doctor\'s Name'
            }],
            flex: 1
        }, {
            xtype: 'list',
            id: 'currentPatients',
            itemTpl: '{lastname}, {firstname} ',
            //out current patients is currently blank, so no store needed yet
            items: [{
                xtype: 'titlebar',
                docked: 'top',
                title: 'Current Patients',
                items: [{
                    xtype: 'button',
                    text: 'Remove',
                    id: 'removePatientButton',
                    align: 'left',
                    disabled: 'true'
                }, {
                    xtype: 'button',
                    text: 'Remove All',
                    id: 'removeAllPatientsButton',
                    align: 'left',
                    disabled: 'true'
                }, ]
            }],
            flex: 1
        }]
    }
});