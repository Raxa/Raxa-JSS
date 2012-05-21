Ext.define('RaxaEmr.Screener.view.NewPatientsForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newpatientsform',
    border: 0,
    padding: 10,
    layout: {
        type: 'auto'
    },
    requires: ['Ext.tab.*', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', ],
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
                    title: 'Add New Patient',
                    fieldDefaults: {
                        msgTarget: 'side'
                    },
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'First Name',
                        labelPad: 20,
                        anchor: '60%',
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Last Name',
                        labelPad: 20,
                        anchor: '60%',
                        allowBlank: false
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'FIFO ID',
                        labelPad: 20,
                        hideTrigger: true,
                        anchor: '60%',
                        allowBlank: false
                    }, {
                        xtype: 'button',
                        margin: '10 50 0 120',
                        width: 60,
                        text: 'Save',
                        handler: function () {
                            var l = Ext.getCmp('mainregarea').getLayout();
                            l.setActiveItem(0); //redirect to home
                        }
                    }, {
                        xtype: 'button',
                        margin: '10 0 0 0',
                        width: 60,
                        text: 'Reset'
                    }]
                }]
            }]
        };
        this.callParent();
    }
});