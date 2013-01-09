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
        height: 310,
        floating: true,
        centered: true,
        showAnimation: {
            type: 'slide',
            direction: 'up'
        },
        hideAnimation: {
            type: 'slideOut',
            direction: 'down'
        },
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'Add New Patient',
            items: [{
                xtype: 'spacer'
            },{
                xtype: 'button',
                iconCls: 'delete',
                iconMask: true,
                handler: function() {
                    Ext.getCmp('newPatient').hide();
                },
                ui: 'decline',
            }]
        },{
            xtype: 'textfield',
            id: 'givenName',
            name: 'givenname',
            label: 'First Name', // Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.giv_name')
            margin: '5 0 5 0'
        }, {
            xtype: 'textfield',
            id: 'familyName',
            name: 'familyname',
            label: 'Last Name', // Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.fam_name')
            margin: '5 0 5 0'
        }, 
        {
            xtype  : 'container',
            id: 'ageDateOfBirth',
//            layout : {
//                type  : 'hbox'
//            },
            items : [
            {
                xtype: 'numberfield',
                id: 'patientAge',
                name: 'patientAge',
//                labelWidth: 138,
                label: 'Age', // Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.age_dob'),
                allowDecimals: false,
//                placeHolder: 'Age',
                margin: '5 0 5 1',
                listeners: {
                    blur: function(field) {
                        field.setValue(Math.floor(field.getValue()));
                        if(!(field.getValue()>=Util.OPEN_MRS_MIN_AGE  && field.getValue()<Util.OPEN_MRS_MAX_AGE))
                        {
                            Ext.Msg.alert('Wrong Input','Patient Age should be between '+ Util.OPEN_MRS_MIN_AGE +' and '+ Util.OPEN_MRS_MAX_AGE);
                            field.setValue('');

                        }
                    }
                }
            },{
                xtype: 'textfield',
                id: 'dob',
                name: 'dob',
                placeHolder: 'YYYY-M-D',
//                width: 172,
                hidden: true
            }
            ]
        },
        {
            xtype  : 'container',
            id: 'sexRadioGroup',
            layout : {
                type  : 'hbox',
                align : 'strech'
            },
            margin: '5 0 5 1',
            items  : [
            {
                xtype : 'radiofield',
                label : 'Male', // Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.male'),
                value: 'M',
                name  : 'choice',
                labelWidth: 70,
                flex  : 1
            },
            {
                xtype : 'radiofield',
                label : 'Female', // Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.female'),
                value: 'F',
                name  : 'choice',
                labelWidth: 90,
                flex  : 1
            },
            {
                xtype : 'radiofield',
                label : 'Other', // Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.other'),
                value: 'O',
                name  : 'choice',
                labelWidth: 70,
                flex  : 1
            }
            ]
        },{
            xtype: 'button',
            id: 'savePatientButton',
            text: 'Save Patient', // Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.save_p'),
            ui: 'action',
            margin: '20 120 0 120'
        }],
    onChange: function () {
         Ext.Msg.alert("Please enter the date format");
    }
    },
    saveForm: function () {
        return this.getValues();
    }
 });