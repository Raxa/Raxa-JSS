Ext.define('RaxaEmr.billing.view.AddItem', {
    extend: 'Ext.form.Panel',
    alias : 'widget.AddItem',

    height: 500,
    width: 759,
    title: 'RAXA',
    id: 'addItem',
//    hidden: true,
//    centered: true,
//    floating: true,
//    layout: {
//        type: 'vbox',
//        align: 'stretch'
//    },
//    listeners:{
//        'show': function() {
//            this.mon(Ext.getBody(), 'mousedown', this.checkCloseClick, this);
//        }
//    },
//    checkCloseClick: function (event) {
//        var cx = event.getX(), cy = event.getY(),
//        box = this.getBox();
//        if (cx < box.x || cx > box.x + box.width || cy < box.y || cy > box.y + box.height) {
//            this.hide();
//            this.mun(Ext.getBody(), 'click', this.checkCloseClick, this);
//        }
//    },
    initComponent: function() {
        var me = this;
         
        Ext.applyIf(me, {
           
            items: [
            {
                xtype: 'container',
                height: 100
            },
            {
                xtype: 'container',
                height: 396,
                fullscreen :true,
                autoScroll: true,
                layout: {
                    type: 'table'
                },
                items: [
                {
                    xtype: 'container',
                    height: 300,
                    width: 429
                },
                {
                    xtype: 'container',
                    height: 275,
                    width: 325,
                    items: [
                    {
                        xtype: 'form',
                        height: 300,
                        layout: {
                           // align: 'stretch',
                            type: 'vbox'
                        },
                        bodyPadding: 10,
                        title: 'Add Item',
                        items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Item Name ',
                          //  value:'',
                            id:'item_name1'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Category ',
                              id:'category1',
                           //  value:'Medicine',
                            store: new Ext.data.SimpleStore({
                        fields: ['category'],
                       
                        data: [
                        ['Medicine'],
                        ['Lab'],
                        ['Radiology'],
                        ['Other']
                    ]
                    }),
                    displayField : 'category'
                           
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Quantity ',
                          value:1,
                            id:'quantity1'
                                            
                                           
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Price ',
                            value:0,
                            id:'price1'
                                            
                                           
                        },
                         {
                            xtype: 'textfield',
                          
                          
                            fieldLabel: 'discount(in %)',
                            value:0,
                            id: 'discount1'
                        },
                         {
                            xtype: 'combobox',
                           
                           fieldLabel: 'discountReason',
                            id: 'discountReason1',
                              store: new Ext.data.SimpleStore({
                        
                        fields: ['discountReason'],
                        data: [
                        ['RSBY'],
                        ['Snake bite'],
                        ['General'],
                        ['Other']
                    ]
                    }),
                     displayField : 'discountReason'
                    
                            
                        //    value:''
                        },
                        {
                            xtype: 'textfield',
                          
                          
                            fieldLabel: ' If Other Discount Reason',
                            value:'',
                            id: 'otherDiscount1'
                        },
                                        
                        {
                           
                            xtype: 'container',
                    height: 333,
                    width: 510,
                    items: [
                        {
                           xtype: 'button',
                          margin: 20,
                            text: 'ADD',
                            id : 'item',
                            action: 'addItem'
                                                               
                        },
                        
{                            xtype: 'button',
                         margin: 20,
                            text: 'Cancel',
                            action: 'cancel'
                                                               
                        }
                    ]},
 
                        ]
                    }
                    ]
                },
                {
                    xtype: 'container',
                    height: 185,
                    width: 214
                }
                ]
            },
            
            
            ]
        });

        me.callParent(arguments);
    }

});


