/**
 * This panel will overlay when a patient is pressed for 2 seconds.
 * This is a form that shows the patient summary
 */
Ext.define('Screener.view.PatientSummary', {
    xtype: 'patientSummary',
    extend: 'Ext.Panel',
    id: 'patientSummary',
    config: {
        centered: true,
        modal: true,
        hideOnMaskTap: true,
        hidden: false,
        // Set the width and height of the panel
        width: 400,
        height: 260,
        scrollable: true,
        items: [{
            xtype: 'textfield',
            label: 'Name : ',
            width: '100%',
            value: 'Creative',
            disabled: 'true',
        }, {
            xtype: 'textfield',
            label: 'Gender : ',
            width: '100%',
            value: 'Male',
            disabled: 'true',
        }, {
            xtype: 'textfield',
            label: 'Age : ',
            width: '100%',
            value: '18',
            disabled: 'true',
        }, {
            xtype: 'textfield',
            label: 'BMI : ',
            width: '100%',
            value: '22',
            disabled: 'true',
        }, {
            xtype: 'textfield',
            label: 'ID# : ',
            width: '100%',
            value: '1',
            disabled: 'true',
        }, {
            xtype: 'textfield',
            label: 'Village : ',
            width: '100%',
            value: 'abc',
            disabled: 'true',
        }, {
            xtype: 'textfield',
            label: 'District : ',
            width: '100%',
            value: 'xyz',
            disabled: 'true',
        }]
    }
});