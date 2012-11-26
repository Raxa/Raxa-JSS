var INVENTORY_NAV_BAR = {
    WIDTH : 180,
    BUTTON_WIDTH : 180,
    BUTTON_HEIGHT: 40,
    BUTTON_MARGIN : 5
};

Ext.define('RaxaEmr.Pharmacy.view.inventoryNavBar', {
    extend: 'Ext.container.Container',
    alias: 'widget.inventoryNavBar',
    id: 'inventoryNavBar',
    width: INVENTORY_NAV_BAR.WIDTH,
    layout: 'vbox',
    // border: true,
    items: [{
        xtype: 'container',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        height: INVENTORY_NAV_BAR.BUTTON_HEIGHT,
        html: '<b><u>STOCK</u></b>'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        height: INVENTORY_NAV_BAR.BUTTON_HEIGHT,
        text: 'Overview',
        id: 'inventoryOverviewButton',
//        listeners: {
//            'render': {
//                fn: function() {
//                    console.log(this);
//                    Ext.getCmp('inventoryOverviewButton').body.on('click', function() {Ext.getCmp('inventoryNavBar').selectNavBar(0)}, this);
//                },
//                single: true
//            }
//        },
        ui: 'raxa-side-panel',
        action: 'navigateInventoryOverview'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        height: INVENTORY_NAV_BAR.BUTTON_HEIGHT,
        text: 'Reports',
        id: 'inventoryReportsButton',
        cls: 'x-btn-raxa-side-panel-small',
        action: 'navigateInventoryReports',
        disabled: true
    }, {
        xtype: 'text',
        margin: 10,
        html: '<b><u>ORDERS</u></b>'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        margin: INVENTORY_NAV_BAR.BUTTON_MARGIN,
        text: 'Request Drugs',
        id: 'newRequisitionButton',
        action: 'newRequisition'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        margin: INVENTORY_NAV_BAR.BUTTON_MARGIN,
        text: 'Send Drugs',
        id: 'newIssueButton',
        action: 'newIssue'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        margin: INVENTORY_NAV_BAR.BUTTON_MARGIN,
        text: 'Update Stock',
        id: 'newReceiptButton',
        action: 'newReceipt'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        margin: INVENTORY_NAV_BAR.BUTTON_MARGIN,
        text: 'Add New Drug',
        id: 'newDrugButton',
        action: 'newDrug'
    }
    //    {
    //        margin: INVENTORY_NAV_BAR.BUTTON_MARGIN,
    //        xtype: 'button',
    //        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
    //        text: 'New Drug Group',
    //        id: 'newDrugGroupButton',
    //        action: 'newDrugGroup'
    //    },
    ],
    selectNavBar: function(item) {
        console.log(item);
    }
});