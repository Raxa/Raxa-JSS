var INVENTORY_NAV_BAR = {
    BUTTON_WIDTH : 170,
    BUTTON_MARGIN : 5,
}

Ext.define('RaxaEmr.Pharmacy.view.inventoryNavBar', {
    extend: 'Ext.container.Container',
    alias: 'widget.inventoryNavBar',
    width: 180,
    layout: 'vbox',
    // border: true,
    items: [{
        xtype: 'text',
        margin: 10,
        html: 'STOCK'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        margin: INVENTORY_NAV_BAR.BUTTON_MARGIN,
        text: 'Overview',
        id: 'inventoryOverviewButton',
        action: 'navigateInventoryOverview'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        margin: INVENTORY_NAV_BAR.BUTTON_MARGIN,
        text: 'Reports',
        id: 'inventoryReportsButton',
        action: 'navigateInventoryReports'
    }, {
        xtype: 'text',
        margin: 10,
        html: 'ORDERS'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        margin: INVENTORY_NAV_BAR.BUTTON_MARGIN,
        text: 'New Requisition',
        id: 'newRequisitionButton',
        action: 'newRequisition'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        margin: INVENTORY_NAV_BAR.BUTTON_MARGIN,
        text: 'New Issue',
        id: 'newIssueButton',
        action: 'newIssue'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        margin: INVENTORY_NAV_BAR.BUTTON_MARGIN,
        text: 'New Receipt',
        id: 'newReceiptButton',
        action: 'newReceipt'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR.BUTTON_WIDTH,
        margin: INVENTORY_NAV_BAR.BUTTON_MARGIN,
        text: 'New Drug',
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
    ]
});