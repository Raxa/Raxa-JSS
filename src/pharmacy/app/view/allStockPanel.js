Ext.define('RaxaEmr.Pharmacy.view.allStockPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.allStockPanel',
    border: false,
    height: 190,
    width: 840,
    layout: {
        type: 'hbox'
    },
    margin: '20 0 0 110',
    items: [
    {
        xtype: 'button',
        width: 150,
        height: 150,
        text: 'Stock Analysis',
        handler: function(){
            var l = Ext.getCmp('stocklayoutarea').getLayout();
            l.setActiveItem(0);
            Ext.getCmp('newpobutton').enable();
            Ext.getCmp('newreceiptbutton').enable();
            Ext.getCmp('newissuebutton').enable();
            Ext.getCmp('newdrugbutton').enable();
            Ext.getCmp('newdruggroupbutton').enable();
        }
    },{
        xtype: 'button',
        width: 150,
        height: 150,
        text: 'Expiring Stock',
        handler: function(){
            var l = Ext.getCmp('stocklayoutarea').getLayout();
            l.setActiveItem(0);
            Ext.getCmp('newpobutton').enable();
            Ext.getCmp('newreceiptbutton').enable();
            Ext.getCmp('newissuebutton').enable();
            Ext.getCmp('newdrugbutton').enable();
            Ext.getCmp('newdruggroupbutton').enable();
        }
    },{
        xtype: 'button',
        width: 150,
        height: 150,
        text: 'Stock Out',
        handler: function(){
            var l = Ext.getCmp('stocklayoutarea').getLayout();
            l.setActiveItem(0);
            Ext.getCmp('newpobutton').enable();
            Ext.getCmp('newreceiptbutton').enable();
            Ext.getCmp('newissuebutton').enable();
            Ext.getCmp('newdrugbutton').enable();
            Ext.getCmp('newdruggroupbutton').enable();
        }
    }
    //        ,{
    //            xtype: 'button',
    //            width: 150,
    //            height: 150,
    //            text: 'Stock Issue',
    //            handler: function(){
    //                var l = Ext.getCmp('stocklayoutarea').getLayout();
    //                l.setActiveItem(1);
    //                Ext.getCmp('newpobutton').disable();
    //                Ext.getCmp('newreceiptbutton').disable();
    //                Ext.getCmp('newissuebutton').enable();
    //                Ext.getCmp('newdrugbutton').enable();
    //                Ext.getCmp('newdruggroupbutton').enable();
    //            }
    //        },{
    //            xtype: 'button',
    //            width: 150,
    //            height: 150,
    //            text: 'Goods Receipt',
    //            handler: function(){
    //                var l = Ext.getCmp('stocklayoutarea').getLayout();
    //                l.setActiveItem(2);
    //                Ext.getCmp('newpobutton').disable();
    //                Ext.getCmp('newreceiptbutton').enable();
    //                Ext.getCmp('newissuebutton').disable();
    //                Ext.getCmp('newdrugbutton').enable();
    //                Ext.getCmp('newdruggroupbutton').enable();
    //            }
    //        }
    ]
});