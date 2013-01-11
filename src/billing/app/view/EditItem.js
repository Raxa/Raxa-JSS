/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('RaxaEmr.billing.view.EditItem', {
    extend: 'Ext.form.Panel',
    alias : 'widget.EditItem',

    height: 500,
    width: 759,
    title: 'RAXA',

   
    id: 'haloy1',
        
        
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
                        title: 'Edit Item',
                        items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Item Name ',
                          //  value:'',
                            id:'item_name2'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Category ',
                              id:'category2',
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
                         // value:1,
                            id:'quantity2'
                                            
                                           
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Price ',
                          //  value:0,
                            id:'price2'
                                            
                                           
                        },
                         {
                            xtype: 'textfield',
                          
                          
                            fieldLabel: 'discount(in %)',
                            value:0,
                            id: 'discount2'
                        },
                         {
                            xtype: 'combobox',
                           
                           fieldLabel: 'discountReason',
                            id: 'discountReason2',
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
                            id: 'otherDiscount2'
                        },
                                        
                        {
                           
                            xtype: 'container',
                    height: 333,
                    width: 510,
                    items: [
                        {
                           xtype: 'button',
                          margin: 20,
                            text: 'EDIT',
                            id : 'editItem',
                            action: 'editItem'
                                                               
                        },
                        
{                            xtype: 'button',
                         margin: 20,
                            text: 'Cancel',
                            action: 'cancelEdit'
                                                               
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




