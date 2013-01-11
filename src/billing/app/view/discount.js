Ext.define('RaxaEmr.billing.view.discount', {
    extend: 'Ext.form.Panel',
    alias: 'widget.discount',
    height: 258,
    width: 415,
    layout: {
        type: 'auto'
    },
    bodyPadding: 10,
    title: 'Add Discount',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'combobox',
                    width: 294,
                    fieldLabel: 'Reason :'
                },
                {
                    xtype: 'textareafield',
                    height: 129,
                    width: 294,
                    fieldLabel: 'Notes :'
                },
                {
                    xtype: 'button',
                    text: 'Add'
                },
                {
                    xtype: 'button',
                    text: 'Add another'
                }
            ]
        });

        me.callParent(arguments);
    }

});
