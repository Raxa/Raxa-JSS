Ext.define('RaxaEmr.billing.view.previousShow', {
    extend: 'Ext.form.Panel',
    alias: 'widget.previousShow',

    height: 589,
    width: 759,
    title: 'RAXA',

    initComponent: function() {
        var me = this;
        // this.addEvents(['itemEdit']);
        Ext.applyIf(me, {
            items: [


            {
                xtype: 'container',
                height: 300,
                width: 0,
                layout: {
                    type: 'table'
                },
                items: [{
                    xtype: 'container',
                    margin: '0 0 0 0',
                    height: 290,
                    width: 0,
                    items: [

                    ]
                }, {
                    xtype: 'container',
                    margin: '0 0 0 0',
                    height: 275,
                    width: 700,
                    items: [{
                        xtype: 'gridpanel',
                        height: 270,
                        width: 690,
                        title: 'olderBill',
                        id: 'newGrid',
                        store: Ext.data.StoreManager.lookup('RaxaEmr.billing.store.previousshow'),

                        columns: [{
                            xtype: 'numbercolumn',
                            width: 100,
                            dataIndex: 'OldproviderId',
                            text: 'providerId',
                            id: 'OldproviderId'
                        }, {
                            xtype: 'gridcolumn',
                            width: 80,
                            dataIndex: 'Olddescription',
                            text: 'description',
                            id: 'Olddescription'
                        }, {
                            xtype: 'gridcolumn',
                            width: 80,
                            dataIndex: 'Oldname',
                            text: 'name',
                            id: 'Oldname'
                        },


                        {
                            xtype: 'numbercolumn',
                            width: 60,
                            dataIndex: 'Oldquantity',
                            text: 'quantity',
                            id: 'Oldquantity'
                        },

                        {
                            xtype: 'numbercolumn',
                            width: 60,
                            dataIndex: 'Olddiscount',
                            text: 'discount',
                            id: 'Olddiscount'
                        }, {
                            xtype: 'numbercolumn',
                            width: 60,
                            dataIndex: 'OldbillItemId',
                            text: 'billItemId',
                            id: 'OldbillItemId'
                        },

                        {
                            xtype: 'gridcolumn',
                            width: 100,
                            dataIndex: 'OlddiscountReason',
                            text: 'discountReason',
                            id: 'OlddiscountReason'
                        }, {
                            xtype: 'numbercolumn',
                            width: 60,
                            dataIndex: 'Oldvalue',
                            text: 'value',
                            id: 'Oldvalue'
                        },


                        ]


                    }]
                }, {
                    xtype: 'container',
                    height: 135,
                    width: 170,
                    items: [{
                        xtype: 'panel',
                        height: 135,
                        margin: '40 0 0 0',
                        title: 'Features',
                        items: [



                        {
                            xtype: 'textfield',
                            height: 30,
                            width: 168,
                            margin: '20 0 0 0',
                            fieldLabel: 'Current Charges  ',
                            id: 'total_amount3',
                            value: 0,
                            readOnly: true
                        },



                        {
                            xtype: 'textfield',
                            height: 30,
                            width: 168,
                            fieldLabel: 'Balance',
                            id: 'balance3',
                            value: 0,
                            readOnly: true
                        },



                        {
                            xtype: 'button',
                            height: 22,
                            width: 168,
                            text: 'Back',
                            id: 'button11',
                            action: 'back'
                        }
                        /*{
                            xtype: 'button',
                            height: 37,
                            width: 118,
                            text: 'RSBY'
                        },
                        {
                            xtype: 'button',
                            height: 72,
                            width: 118,
                            text: 'Collect Money'
                        }*/
                        ]
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }

});