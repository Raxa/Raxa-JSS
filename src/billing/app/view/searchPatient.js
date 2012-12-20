Ext.define('RaxaEmr.billing.view.searchPatient', {
    extend: 'Ext.form.Panel',
    alias: 'widget.searchPatient',
    height: 485,
    width: 759,
    title: 'RAXA',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'container',
                height: 255,
                layout: {
                    type: 'table'
                },
                items: [{
                    xtype: 'container',
                    height: 260,
                    width: 208,
                    items: [{
                        xtype: 'form',
                        height: 243,
                        layout: {
                            align: 'stretch',
                            type: 'vbox'
                        },
                        bodyPadding: 10,
                        title: 'Find Patient',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Patient Id :'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'First Name :'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Last Name :'
                        }, {
                            xtype: 'button',
                            margin: 30,
                            text: 'Find'
                        }]
                    }]
                }, {
                    xtype: 'container',
                    height: 260,
                    width: 500,
                    items: [{
                        xtype: 'gridpanel',
                        height: 242,
                        width: 509,
                        title: 'Search Results',
                        columns: [{
                            xtype: 'numbercolumn',
                            width: 65,
                            text: 'Patient Id'
                        }, {
                            xtype: 'gridcolumn',
                            width: 59,
                            dataIndex: 'string',
                            text: 'First Name'
                        }, {
                            xtype: 'gridcolumn',
                            width: 60,
                            text: 'Last Name'
                        }, {
                            xtype: 'gridcolumn',
                            width: 35,
                            text: 'Sex'
                        }, {
                            xtype: 'numbercolumn',
                            width: 36,
                            dataIndex: 'number',
                            text: 'Age'
                        }, {
                            xtype: 'gridcolumn',
                            width: 122,
                            dataIndex: 'date',
                            text: 'Husband/Father name'
                        }, {
                            xtype: 'gridcolumn',
                            width: 61,
                            dataIndex: 'bool',
                            text: 'Village'
                        }, {
                            xtype: 'gridcolumn',
                            width: 70,
                            text: 'Town'
                        }],
                        viewConfig: {

                        }
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }

});