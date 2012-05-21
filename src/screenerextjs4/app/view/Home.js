Ext.define('RaxaEmr.Screener.view.Home', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.home',
    border: 0,
    padding: 10,
    layout: {
        type: 'fit'
    },
    requires: ['Ext.tab.*', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', ],
    initComponent: function () {
        this.items = {
            border: 0,
            layout: {
                type: 'fit'
            },
            items: [{
                xtype: 'form',
                border: 0,
                layout: {
                    align: 'center',
                    pack: 'center',
                    type: 'vbox'
                },
                bodyPadding: 10,
                items: [{
                    xtype: 'image',
                    height: 130,
                    margin: '0 0 20 0',
                    width: 130,
                    src: '../resources/img/logo.png'
                }, {
                    xtype: 'button',
                    height: 35,
                    margin: '10 0 0 0',
                    width: 300,
                    text: 'Add New Patient',
                    handler: function () {
                        var l = Ext.getCmp('mainregarea').getLayout();
                        l.setActiveItem(1); //redirect to new patient form 
                    }
                }, {
                    xtype: 'button',
                    height: 35,
                    width: 300,
                    margin: '10 0 0 0',
                    text: 'Show Unassigned Patients',
                    handler: function () {
                        var l = Ext.getCmp('mainregarea').getLayout();
                        l.setActiveItem(2); //redirect to mapping card
                    }
                }, {
                    xtype: 'button',
                    height: 35,
                    width: 300,
                    margin: '10 0 0 0',
                    text: 'Show Doctors',
                    handler: function () {
                        var l = Ext.getCmp('mainregarea').getLayout();
                        l.setActiveItem(3); //redirect to OPD status
                    }
                }]
            }]
        };
        this.callParent();
    }
});