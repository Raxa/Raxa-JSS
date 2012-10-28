var INVENTORY_NAV_BAR_BUTTON_WIDTH = 170;
Ext.define('RaxaEmr.Pharmacy.view.inventoryNavBar', {
    extend: 'Ext.container.Container',
    alias: 'widget.inventoryNavBar',
    width: 180,
    layout: 'vbox',
    border: false,
    items: [{
        xtype: 'text',
        width: INVENTORY_NAV_BAR_BUTTON_WIDTH,
        margin: 10,
        html: 'Stock'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR_BUTTON_WIDTH,
        margin: 5,
        text: 'New Requisition',
        id: 'newRequisitionButton',
        action: 'newRequisition'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR_BUTTON_WIDTH,
        margin: 5,
        text: 'New Issue',
        id: 'newIssueButton',
        action: 'newIssue'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR_BUTTON_WIDTH,
        margin: 5,
        text: 'New Receipt',
        id: 'newReceiptButton',
        action: 'newReceipt'
    }, {
        xtype: 'button',
        width: INVENTORY_NAV_BAR_BUTTON_WIDTH,
        margin: 5,
        text: 'New Drug',
        id: 'newDrugButton',
        action: 'newDrug'
    }
    //    {
    //        margin: 5,
    //        xtype: 'button',
    //        width: INVENTORY_NAV_BAR_BUTTON_WIDTH,
    //        text: 'New Drug Group',
    //        id: 'newDrugGroupButton',
    //        action: 'newDrugGroup'
    //    },
    ]
});