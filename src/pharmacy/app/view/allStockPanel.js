Ext.define('RaxaEmr.Pharmacy.view.allStockPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.allStockPanel',
    border: false,
    height: 285,
    width: 743,
    layout: {
        type: 'absolute'
    },
    items: [
    {
        xtype: 'textfield',
        emptyText: 'Search',
        x: 450,
        y: 10
    },
    {
        xtype: 'panel',
        autoScroll: true,
        height: 200,
        width: 723,
        x: 10,
        y: 40,
        layout: {
            type: 'hbox',
            align: 'stretch',
            padding: 5
        },
        items: [{
            xtype: 'button',
            width: 150,
            height: 150
        },{
            xtype: 'button',
            width: 150,
            height: 150
        },{
            xtype: 'button',
            width: 150,
            height: 150
        },{
            xtype: 'button',
            width: 150,
            height: 150
        },{
            xtype: 'button',
            width: 150,
            height: 150
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