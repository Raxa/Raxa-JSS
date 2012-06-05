Ext.define('Registration.view.RegistrationPart2', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.registrationpart2',
    border: 0,
    padding: 10,
    autoScroll: true,
    layout: {
        type: 'auto'
    },
    initComponent: function () {
        this.items = {
            border: 0,
            items: [{
                xtype: 'panel',
                border: 0,
                bodyPadding: 10,
                items: [{
                    xtype: 'fieldset',
                    padding: 10,
                    title: 'New Patient Registration (Patient Communication Info)',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Block/House/Door Number',
                        emptyText: 'Block/House/Door Number',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Street/Area/Locality/Mohala/Road',
                        emptyText: 'Street/Area/Locality/Mohala/Road',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Town/Village/City',
                        emptyText: 'Town/Village/City',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Post Office',
                        emptyText: 'Post Office',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Pin Code',
                        emptyText: 'Pin Code',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Tehsil/Taluka/Mandal/Thana',
                        emptyText: 'Tehsil/Taluka/Mandal/Thana',

                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'District',
                        emptyText: 'District',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        hideTrigger: true,
                        anchor: '95%'
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: 'Contact me via phone',
                        id: 'phoneContactInformation',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        allowBlank: false,
                        items: [{
                            xtype: 'radiofield',
                            name: 'contact',
                            boxLabel: 'Yes'
                        }, {
                            xtype: 'radiofield',
                            name: 'contact',
                            boxLabel: 'No'
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Contact Number',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'textfield',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            name: 'primaryContact',
                            emptyText: 'Primary Contact',
                            id: 'patientPrimaryContact',
                            flex: 1,
                            allowBlank: false
                        }, {
                            name: 'lastName',
                            emptyText: 'Secondary Contact',
                            id: 'patientSecondaryContact',
                            flex: 1,
                            margins: '0 0 0 6',
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'button',
                        margin: '30 0 0 250',
                        width: 60,
                        text: 'Back',
                        handler: function () {
                            var l = Ext.getCmp('mainregarea').getLayout();
                            l.setActiveItem(1); //going to registration part-1 page
                        }

                    }, {
                        xtype: 'button',
                        margin: '30 0 0 30',
                        width: 60,
                        text: 'Continue',
                        handler: function () {
                            var l = Ext.getCmp('mainregarea').getLayout();
                            l.setActiveItem(3); //going to confirmation page
                        }



                    }, {
                        xtype: 'button',
                        margin: '30 0 0 30',
                        width: 60,
                        text: 'Cancel',
                        handler: function () {
                            var l = Ext.getCmp('mainregarea').getLayout();
                            l.setActiveItem(0); //going to home page
                        }
                    }]
                }]
            }]
        };
        this.callParent();
    }
});
