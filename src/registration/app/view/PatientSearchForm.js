Ext.require([
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Text',
    'Ext.field.Password',
    'Ext.field.Email',
    'Ext.field.Url',
    'Ext.field.Checkbox',
    'Ext.field.Spinner',
    'Ext.field.Select',
    'Ext.field.Hidden',
    'Ext.field.DatePicker',
    'Ext.field.TextArea',
    'Ext.field.Slider',
    'Ext.field.Toggle',
    'Ext.field.Radio',
    'Ext.Button',

    'Ext.data.Store'
]);
Ext.define('RaxaEmr.Registration.view.PatientSearchForm', {
    extend: 'Ext.Container',
    requires: 'Ext.form.*',
    config: {
        fullscreen: true,
        layout: 'vbox',
        id: 'halo',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                xtype: 'spacer'
            },{
                iconCls: 'settings',
                iconMask: true, 
                ui: 'plain',
                handler: function(){
                    if(!this.overlay){
                        this.overlay = Ext.Viewport.add({
                            xtype: 'panel',
                            modal: true,
                            hideOnMaskTap: true,
                            top: 45,
                            right: 0,
                            style: 'right: -5px;top: 45px',
                            items: [{
                                xtype: 'fieldset',
                                items:[{
                                    xtype: 'textfield',
                                    placeHolder: 'Host URL',
                                    name: 'hostField',
                                    listeners: {
                                        change: {
                                            fn: function() {
                                                alert('changed');
                                            }
                                        }
                                    },
                                    //width: 450,
                                    style: 'background-color: white;',
                                    value: host 
                                }]
                            }]
                        });
                    }
                    this.overlay.show();
                }
            }]
        },{
            id: 'logoPanel',
            centered: true,
            style: 'margin-top: -650px',
            items: [{
                html: '<div style="text-align:center;"><img src="../../src/resources/img/logo.png" width="143" height="143"/></div>'
            },{
                html: '<div class="logoText">Jan Swasthya Sahyog</div>'
            }]
        },{
            xtype: 'fieldset',
            title: 'To find the patient information enter patient ID or any 3 of the 4 fields below',
            align: 'center',
            centered: true,
            items: [{
                xtype: 'textfield',
                label: 'Patient ID:',
                clearIcon: true
            },{
                xtype: 'textfield',
                label: 'First Name:',
                clearIcon: true
            },{
                xtype: 'textfield',
                label: 'Last Name:',
                clearIcon: true
            },{
                xtype: 'textfield',
                label: 'Father/Husband First Name:',
                clearIcon: true,
                width: '40em'
            },{
                xtype: 'textfield',
                label: 'Father/Husband Last Name:',
                clearIcon: true
            },{
                xtype: 'datepickerfield',
                label: 'Date of Birth:',
                value: new Date(),
                picker: {
                    yearFrom: 1930
                },
                clearIcon: true
            },{
                xtype: 'textfield',
                label: 'Town/City/Village:',
                clearIcon: true
            },{
                xtype: 'textfield',
                label: 'Phone Number:',
                clearIcon: true
            }]
        },{
            items: [{
            xtype: 'button',
            text: 'Search',
            ui: 'decline-round',
            centered: true,
            //width: 350,
            style: 'margin-top: 675px;'
        }]
        }

        ]
    }
});
