Ext.define('RaxaEmr.billing.view.currentBill_main', {
    extend: 'Ext.form.Panel',
    alias: 'widget.currentBill_main',

    height: 589,
    width: 759,
    title: 'RAXA',

    initComponent: function() {
        var me = this;
        this.addEvents(['itemDelete'], ['itemEdit']);
        Ext.applyIf(me, {
            items: [{
                xtype: 'container',
                height: 28,
                layout: {
                    type: 'table'
                },
                items: [{
                    xtype: 'container',
                    height: 27,
                    width: 168,
                    items: [{
                        xtype: 'panel',
                        title: 'Find Patient ',
                        tools: [{
                            xtype: 'tool',
                            id: 'Click',
                            action: 'setLayo'
                        }]
                    }]
                }]
            }, {
                xtype: 'container',
                height: 193,
                layout: {
                    type: 'table'
                },
                items: [{
                    xtype: 'container',
                    height: 178,
                    width: 169
                }, {
                    xtype: 'container',
                    height: 130,
                    width: 565,
                    layout: {
                        type: 'table'
                    },
                    items: [{
                        xtype: 'container',
                        height: 137,
                        width: 159,
                        items: [{
                            xtype: 'image',
                            height: 101,
                            width: 121
                        }]
                    }, {
                        xtype: 'container',
                        height: 149,
                        width: 182,
                        items: [{
                            xtype: 'textfield',
                            width: 180,
                            fieldLabel: 'Patient Name '
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Patient Id '
                        }, {
                            xtype: 'datefield',
                            width: 183,
                            fieldLabel: 'DOB '
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Gender '
                        }]
                    }, {
                        xtype: 'container',
                        height: 149,
                        width: 237,
                        layout: {
                            type: 'table'
                        },
                        items: [{
                            xtype: 'container',
                            height: 97,
                            width: 29
                        }, {
                            xtype: 'container',
                            height: 108,
                            width: 190,
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Doctor\'s Name '
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Location '
                            }]
                        }]
                    }]
                }]
            }, {
                xtype: 'container',
                height: 222,
                width: 312,
                layout: {
                    type: 'table'
                },
                items: [{
                    xtype: 'container',
                    height: 206,
                    width: 300,
                    items: [

                    ]
                }, {
                    xtype: 'container',
                    height: 206,
                    width: 700,
                    items: [{
                        xtype: 'gridpanel',
                        height: 217,
                        width: 690,
                        title: 'CurrentBill',
                        id: 'gridCurrentBill',
                        store: Ext.data.StoreManager.lookup('RaxaEmr.billing.store.itemStore'),

                        columns: [{
                            xtype: 'gridcolumn',
                            width: 69,
                            dataIndex: 'item_name',
                            text: 'item_name',
                            id: 'item_name'
                        }, {
                            xtype: 'gridcolumn',
                            width: 54,
                            dataIndex: 'category',
                            text: 'category',
                            id: 'category'
                        }, {
                            xtype: 'numbercolumn',
                            width: 49,
                            dataIndex: 'quantity',
                            text: 'quantity',
                            id: 'quantity'
                        }, {
                            xtype: 'numbercolumn',
                            width: 48,
                            dataIndex: 'price',
                            text: 'price',
                            id: 'price'
                        }, {
                            xtype: 'numbercolumn',
                            width: 48,
                            dataIndex: 'discount',
                            text: 'discount',
                            id: 'discount'
                        }, {
                            xtype: 'gridcolumn',
                            width: 200,
                            dataIndex: 'discountReason',
                            text: 'discountReason',
                            id: 'discountReason'
                        }, {
                            xtype: 'numbercolumn',
                            width: 48,
                            dataIndex: 'total',
                            text: 'total',
                            id: 'total'
                        }, {
                            xtype: 'actioncolumn',
                            width: 45,
                            items: [{
                                icon: '../resources/img/edit.png',
                                tooltip: 'Edit',
                                handler: function(grid, rowIndex) {
                                    me.fireEvent('itemEdit', {
                                        rowIndex: rowIndex
                                    });
                                }
                            }]
                        }, {
                            xtype: 'actioncolumn',
                            width: 45,
                            items: [{
                                icon: '../resources/img/delete.png',
                                tooltip: 'Delete',
                                handler: function(grid, rowIndex) {
                                    me.fireEvent('itemDelete', {
                                        rowIndex: rowIndex
                                    });
                                    /* var itemStore1 = Ext.getStore('RaxaEmr.billing.store.itemStore');
                                    //  console.log(evtData.rowIndex);
                                    var record = itemStore1.getAt(rowIndex);
                                    if(record) {
                                        itemStore1.remove(record);
                                        itemStore1.sync();
             
                                        var amount=Ext.getCmp('current_amount');
                                        var prev_amount=Ext.getCmp('prev_amount');
                                        var tot_amount=Ext.getCmp('total_amount');
                                        var paid =Ext.getCmp('amount_paid');
                                        var pay= paid.getValue();
                                        var balance = Ext.getCmp('balance1');
                                        var prev=prev_amount.getValue();
                                        var prev1=parseInt(prev);
                                        var total;
                                        var bal;
             
                                        var tot=0;
                                        for (var j = 0; j < itemStore1.getCount(); j++) {
                                            // order[j].concept = concept[j].getAt(0).getData().uuid;
                                            tot=tot+itemStore1.getAt(j).getData().total;
                                        }
                                        amount.setValue(tot);
                                        total=tot+prev1;
                                        bal=total-pay;
                                        amount.setValue(tot);
                    
                                        tot_amount.setValue(total);
                                        balance.setValue(bal);
                                    }*/

                                    /*  me.fireEvent('billDelete', {
                                        rowIndex: rowIndex,
                                        colIndex: colIndex
                                    });*/
                                }
                            }]
                        }],

                        features: [{
                            ftype: 'grouping'
                        }]
                    }]
                }, {
                    xtype: 'container',
                    height: 220,
                    width: 170,
                    items: [{
                        xtype: 'panel',
                        height: 220,
                        title: 'Features',
                        items: [{
                            xtype: 'button',
                            height: 22,
                            width: 168,
                            text: 'Add Item',
                            ui: 'raxa-aqua-small',
                            action: 'findPatient1'
                        }, {
                            xtype: 'button',
                            height: 22,
                            width: 168,
                            text: ' Save and Print Bill',
                            ui: 'raxa-orange-small',
                            action: 'saveBill'
                        }, {
                            xtype: 'button',
                            height: 22,
                            width: 168,
                            text: ' Pay bill',
                            action: 'payBill'
                        }, {
                            xtype: 'textfield',
                            height: 20,
                            width: 168,
                            fieldLabel: 'Current Amount ',
                            id: 'current_amount',
                            value: 0,
                            readOnly: true
                        }, {
                            xtype: 'textfield',
                            height: 20,
                            width: 168,
                            fieldLabel: 'Previous Amount ',
                            id: 'prev_amount',
                            value: 0,
                            readOnly: true
                        }, {
                            xtype: 'textfield',
                            height: 20,
                            width: 168,
                            fieldLabel: 'Total Amount ',
                            id: 'total_amount',
                            value: 0,
                            readOnly: true
                        },


                        {
                            xtype: 'textfield',
                            height: 20,
                            width: 168,
                            fieldLabel: 'Amount Paid ',
                            id: 'amount_paid',
                            value: 0
                        }, {
                            xtype: 'textfield',
                            height: 20,
                            width: 168,
                            fieldLabel: 'Balance',
                            id: 'balance1',
                            value: 0,
                            readOnly: true
                        },
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