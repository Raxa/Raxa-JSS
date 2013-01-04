Ext.define('RaxaEmr.billing.view.Viewport', {
    extend: 'Ext.container.Viewport',
    width: 960,
    autoHeight: 800,
    layout: {
        type: 'card',
        align: 'center'
    },
    id: 'mainarea',
    activeItem: 0,
    items:[{
            xtype: 'currentBill_main'
        },

        {
            xtype: 'discount'
        },
        {
            xtype: 'currentbill'
        },
        {
            xtype: 'previousBills'
        },{
            xtype: 'searchPatient'
        },{
            xtype: 'print_Final'
        },
        {
            xtype: 'AddItem'
        } ,
        {
            xtype:'EditItem'

        },
        {
            xtype: 'previousShow'
        }    
    ]
});
