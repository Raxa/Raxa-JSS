Ext.define('RaxaEmr.Pharmacy.view.allStock', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.allStock',
    title: 'Stock >> Overview',
    height: 600,
    items: [{
        margin: '10 0 0 0',
        height: 30,
        xtype: 'allStockForm'
    }, {
        height: 30,
        xtype: 'allStockPanel'
    }, {
        layout: 'card',
        border: false,
        activeItem: 0,
        id: 'stocklayoutarea',
        height: 470,
        // flex: 3,
        //one stock grid here, then use filter to change it
        items: [{
            xtype: 'allStockGrid',
            id: 'allStockGrid'
        }, {
            xtype: 'stockIssueGrid'
        }]
    }]
});