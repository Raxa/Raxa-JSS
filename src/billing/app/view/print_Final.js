Ext.define('RaxaEmr.billing.view.print_Final', {
    extend: 'Ext.form.Panel',
    alias: 'widget.print_Final',
    height: 489,
    width: 759,
    layout: {
        type: 'table'
    },
    title: 'RAXA',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    height: 445,
                    width: 142,
                    items: [
                        {
                            xtype: 'panel',
                            title: 'My Panel',
                            tools: [
                                {
                                    xtype: 'tool'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 370,
                    width: 72
                },
                {
                    xtype: 'container',
                    height: 333,
                    width: 510,
                    items: [
                        {
                            xtype: 'label',
                            height: 14,
                            width: 43,
                            text: 'Charges'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Current :'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Previous :'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Total :'
                        },
                        {
                            xtype: 'textfield',
                            width: 270,
                            fieldLabel: 'Amount Received'
                        },
                        {
                            xtype: 'button',
                            text: 'Discount'
                        },
                        {
                            xtype: 'button',
                            text: 'Save and Print'
                        },
                        {
                            xtype: 'button',
                            text: 'Save'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});
