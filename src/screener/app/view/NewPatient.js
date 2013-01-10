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

        items: [{
            xtype: 'textfield',
            id: 'givenName',
            name: 'givenname',
            label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.giv_name')
        }, {
            xtype: 'textfield',
            id: 'familyName',
            name: 'familyname',
            label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.fam_name')
        }, 
        {
            xtype  : 'container',
            id: 'ageDateOfBirth',
            layout : {
                type  : 'hbox'
            },
            items : [
            {
                xtype: 'numberfield',
                id: 'patientAge',
                name: 'patientAge',
                labelWidth: 70,
                label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.age_dob'),
                allowDecimals: false,
//                placeHolder: 'Age',
                margin: '5 0 5 1',
                listeners: {
                    blur: function(field) {
                        //TODO  Set it in global space OR get concept range
                        var MAX_PATIENT_AGE = 119;
                        var MIN_PATIENT_AGE = 0;
                        field.setValue(Math.floor(field.getValue()));
                        if(!(field.getValue()>=MIN_PATIENT_AGE  && field.getValue()<=MAX_PATIENT_AGE))
                        {
                            Ext.Msg.alert('Wrong Input','Patient Age should be between '+ MIN_PATIENT_AGE +' and '+ MAX_PATIENT_AGE);
                            field.setValue('');

                        }
                    }
                }
            },{
                xtype: 'textfield',
                id: 'dob',
                name: 'dob',
                labelWidth: 70,
                placeHolder: 'YYYY-M-D'
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
            items  : [
            {
                xtype : 'radiofield',
                label : Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.male'),
                value: 'M',
                name  : 'choice',
                labelWidth: 70,
                flex  : 1
            },
            {
                xtype : 'radiofield',
                label : Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.female'),
                value: 'F',
                name  : 'choice',
                labelWidth: 90,
                flex  : 1
            },
            {
                xtype : 'radiofield',
                label : Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.other'),
                value: 'O',
                name  : 'choice',
                labelWidth: 70,
                flex  : 1
            }
            ]
        },{
            xtype: 'button',
            id: 'savePatientButton',
            text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.NewPatient.save_p'),
            ui: 'action'
        }],
    onChange: function () {
         Ext.Msg.alert("Please enter the date format");
    }
    },
    saveForm: function () {
        return this.getValues();
    }
 });
