/**
 * This panel will overlay when the new patient button is
 * pressed. This is a form that gets user name and shows
  */
Ext.define("Screener.view.NewPatient", {
    requires: ['Ext.field.Text', 'Ext.field.Number'],
    extend: 'Ext.form.Panel',
    xtype: 'newPatient',
    id: 'newPatient',
    config: {
        centered: true,
        modal: true,
        hideOnMaskTap: true,
        hidden: true,
        // Set the width and height of the panel
        width: 500,
        height: 240,

        items: [{
            xtype: 'textfield',
            id: 'givenName',
            name: 'givenname',
            label: 'Given Name'
        }, {
            xtype: 'textfield',
            id: 'familyName',
            name: 'familyname',
            label: 'Family Name'
        }, {
            xtype  : 'container',
            id: 'sexRadioGroup',
            layout : {
                type  : 'hbox',
                align : 'strech'
            },
            items  : [
                {
                    xtype : 'radiofield',
                    label : 'Male',
                    value: 'M',
                    name  : 'choice',
                    labelWidth: 70,
                    flex  : 1
                },
                {
                    xtype : 'radiofield',
                    label : 'Female',
                    value: 'F',
                    name  : 'choice',
                    labelWidth: 90,
                    flex  : 1
                },
                {
                    xtype : 'radiofield',
                    label : 'Other',
                    value: 'O',
                    name  : 'choice',
                    labelWidth: 70,
                    flex  : 1
                }
            ]
        },{
            xtype: 'button',
            id: 'savePatientButton',
            text: 'Save Patient',
            ui: 'action'
        }]
    },
    saveForm: function () {
        return this.getValues();
    }
});