Ext.define('RaxaEmr.Pharmacy.view.allStock', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.allStock',
    title: 'Stock >> Overview',
    items: [{
        margin: '10 0 0 0',
        xtype: 'allStockForm'
    }, {
        xtype: 'allStockPanel'
    }, {
        layout: 'card',
        border: false,
        activeItem: 0,
        id: 'stocklayoutarea',
        //one stock grid here, then use filter to change it
        items: [{
            xtype: 'allStockGrid',
            id: 'allStockGrid'
        }, {
            xtype: 'stockIssueGrid'
        }]
    }]
});