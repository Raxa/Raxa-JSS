var INVENTORY_NAV_BAR = {
    WIDTH : 180,
    BUTTON_WIDTH : 180,
    BUTTON_HEIGHT: 40,
    BUTTON_MARGIN : 5,
    TITLE_HEIGHT: 20
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
        margin: '10 0 0 20',
        html: '<b><u>STOCK</u></b>',
        height: INVENTORY_NAV_BAR.TITLE_HEIGHT
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        height: INVENTORY_NAV_BAR.BUTTON_HEIGHT,
        text: 'Overview',
        id: 'inventoryOverviewButton',
        action: 'navigateInventoryOverview'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        height: INVENTORY_NAV_BAR.BUTTON_HEIGHT,
        text: 'Reports',
        id: 'inventoryReportsButton',
        action: 'navigateInventoryReports',
        disabled: true
    }, {
        xtype: 'container',
        margin: '20 0 0 20',
        html: '<b><u>ORDERS</u></b>',
        height: INVENTORY_NAV_BAR.TITLE_HEIGHT
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        height: INVENTORY_NAV_BAR.BUTTON_HEIGHT,
        text: 'Request Drugs',
        id: 'newRequisitionButton',
        action: 'newRequisition'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        height: INVENTORY_NAV_BAR.BUTTON_HEIGHT,
        text: 'Send Drugs',
        id: 'newIssueButton',
        action: 'newIssue'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        height: INVENTORY_NAV_BAR.BUTTON_HEIGHT,
        text: 'Update Stock',
        id: 'newReceiptButton',
        action: 'newReceipt'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        height: INVENTORY_NAV_BAR.BUTTON_HEIGHT,
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