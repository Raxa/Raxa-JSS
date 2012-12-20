Ext.define('RaxaEmr.billing.view.previousBills', {
    extend: 'Ext.form.Panel',
alias : 'widget.previousBills',
    height: 589,
    width: 759,
    title: 'RAXA',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    height: 28,
                    
                    layout: {
                        type: 'table'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 27,
                            width: 168,
                            items: [
                                {
                                    xtype: 'panel',
                                    title: 'Find Patient ',
                                    tools: [
                                        {
                                            xtype: 'tool'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 193,
                    
                    layout: {
                        type: 'table'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 178,
                            width: 169
                        },
                        {
                            xtype: 'container',
                            height: 168,
                            width: 565,
                            layout: {
                                type: 'table'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    height: 137,
                                    width: 159,
                                    items: [
                                        {
                                            xtype: 'image',
                                            height: 101,
                                            width: 121
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    height: 149,
                                    width: 182,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            width: 180,
                                            fieldLabel: 'Patient Name :'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Patient Id :'
                                        },
                                        {
                                            xtype: 'datefield',
                                            width: 183,
                                            fieldLabel: 'DOB:'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Gender :'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    height: 149,
                                    width: 237,
                                    layout: {
                                        type: 'table'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            height: 97,
                                            width: 29
                                        },
                                        {
                                            xtype: 'container',
                                            height: 108,
                                            width: 190,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Doctor\'s Name :'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Location :'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 310,
                    width: 1000,
                    margin:'0 0 0 275',
                    layout: {
                        type: 'table'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 206,
                            width: 1000,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    height: 198,
                                    width:1000 ,
                                    title: 'Previous Bills',
                                    id : 'gridPrevious',
                                        store: Ext.data.StoreManager.lookup('RaxaEmr.billing.store.billingstore'),

                                    columns: [
                                        
                                         
                                         {
                                            xtype: 'numbercolumn',
                                            width: 100,
                                            dataIndex: 'balance',
                                            id :'balance',
                                            text: 'Pending Balance'
                                        },
                                         {
                                            xtype: 'numbercolumn',
                                            width: 100,
                                            dataIndex: 'totalAmount',
                                            id :'totalAmount',
                                            text: 'Current Charges'
                                        },
                                        
                                        {
                                            xtype: 'gridcolumn',
                                            width: 150,
                                            dataIndex: 'uuid',
                                            id :'uuid',
                                            text: 'uuid'
                                        },
                                        
                                        {
                                            xtype: 'numbercolumn',
                                            width: 100,
                                            dataIndex: 'billId',
                                            id :'billId',
                                            text: 'billId'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 100,
                                            dataIndex: 'status',
                                            id :'status',
                                            text: 'status'
                                        },
                                        
                                        {
                                            xtype: 'numbercolumn',
                                            width: 100,
                                            dataIndex: 'providerId',
                                            id :'providerId',
                                            text: 'providerId'
                                        },
                                         
                                        
                                
                                        {
                                            xtype: 'datecolumn',
                                            width: 100,
                                            id : 'dateCreated',
                                            dataIndex: 'dateCreated',
                                            format: 'Y-n-d h:i:s A',
                                            text: 'dateCreated'
                                        },
                                        
                                        
                                         {
            xtype: 'actioncolumn',
            width: 45,
            items: [{
                icon: '../resources/img/edit.png',
                tooltip: 'Show Bill',
                handler: function(grid, rowIndex) {
                    me.fireEvent('showBill', {
                        rowIndex: rowIndex
                       
                    });
                }
            }]
    }
                                            
                                    ],
                                    
                                    
                                    viewConfig: {

                                    }
                                }
,
{
xtype:'container',
height: 206,
                            width: 1000,
items:[
              
            {
                 xtype: 'textfield',
                    readOnly: true,
                    id:'previousamount',
                    fieldLabel: 'Previous Bills Amount Due'
            },

{
                            xtype: 'button',
                            id:'button',
                            height: 40,
                            width: 150,
                            margin :'10 0 0 100',
                            text: 'Create a new Bill',
                            ui :'raxa-aqua-small',
                            action: 'findPatient2'
                        } 
          
            
]}
            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});