Ext.define('RaxaEmr.Pharmacy.view.allStockPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.allStockPanel',
    border: false,
    height: 285,
    width: 840,
    layout: {
        type: 'absolute'
    },
    items: [
    {
        xtype: 'textfield',
        emptyText: 'Search',
        x: 600,
        y: 10
    },
    {
        xtype: 'panel',
        autoScroll: true,
        border: false,
        hideScroller: true,
        height: 200,
        width: 723,
        x: 110,
        y: 40,
        layout: {
            type: 'hbox',
            align: 'stretch',
            padding: 5
        },
        items: [{
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
        },{
            xtype: 'button',
            width: 150,
            height: 150,
            text: 'Stock Issue',
            handler: function(){
                var l = Ext.getCmp('stocklayoutarea').getLayout();
                l.setActiveItem(1);
                Ext.getCmp('newpobutton').disable();
                Ext.getCmp('newreceiptbutton').disable();
                Ext.getCmp('newissuebutton').enable();
                Ext.getCmp('newdrugbutton').enable();
                Ext.getCmp('newdruggroupbutton').enable();
            }
        },{
            xtype: 'button',
            width: 150,
            height: 150,
            text: 'Goods Receipt',
            handler: function(){
                var l = Ext.getCmp('stocklayoutarea').getLayout();
                l.setActiveItem(2);
                Ext.getCmp('newpobutton').disable();
                Ext.getCmp('newreceiptbutton').enable();
                Ext.getCmp('newissuebutton').disable();
                Ext.getCmp('newdrugbutton').enable();
                Ext.getCmp('newdruggroupbutton').enable();
            }
        },{
            xtype: 'button',
            width: 150,
            height: 150
        },{
            xtype: 'button',
            width: 150,
            height: 150
        }]
    }]
});