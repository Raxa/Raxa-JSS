Ext.define('RaxaEmr.billing.view.Viewport', {
    extend: 'Ext.container.Viewport',
  /*  config: {
        fullscreen: true,
        items: [{
            xtype: 'bill' // view/Register.js
        }]
    }*/
   /*autoScroll: true,
    width: 960,
    layout: {
        type: 'vbox',
        align: 'center'
    },*/
    initComponent: function () {
       
     this.items = {
  /* items:[{
        xtype: 'billingtopbar'
    },{
        autoScroll: true,
        layout: 'auto',
        width:960,*/
       items:[{
            layout: 'card',
            id: 'mainarea',
            activeItem: 0,
            items:[{
                xtype: 'main'
            },
           
            {
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
            }    ,
            
            
            {
                xtype:'EditItem'
                
            },
            
             {
                xtype: 'previousShow'
            }    
    ]
      }]
   
    // items :[{xtype :'main'}]

    //items :[{html : 'hello'  },{xtype :'bill'}]
  // }]
     };
             this.callParent();
    }
});