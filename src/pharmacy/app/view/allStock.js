Ext.define('RaxaEmr.Pharmacy.view.allStock', {
    extend: 'Ext.container.Container',
    alias: 'widget.allStock',
    layout: {
        type: 'hbox'
    },
    items: [{
        // Left bar
        xtype: 'container',
        // height: 480,
        width: 180,
        layout: 'vbox',
        border: false,
        items: [{
            // margin: 5,
            xtype: 'button',
            // width: 100,
            text: 'New Requisition',
            id: 'newRequisitionButton',
            action: 'newRequisition'
        }, {
            // margin: 5,
            xtype: 'button',
            // width: 90,
            text: 'New Issue',
            id: 'newIssueButton',
            action: 'newIssue'
        }, {
            // margin: 5,
            xtype: 'button',
            // width: 90,
            text: 'New Receipt',
            id: 'newReceiptButton',
            action: 'newReceipt'
        }, {
            // margin: '5 5 5 400',
            xtype: 'button',
            // width: 90,
            text: 'New Drug',
            id: 'newDrugButton',
            action: 'newDrug'
        }
        //    {
        //        margin: 5,
        //        xtype: 'button',
        //        width: 90,
        //        text: 'New Drug Group',
        //        id: 'newDrugGroupButton',
        //        action: 'newDrugGroup'
        //    },
        ]

        // }, {
        //     // Page Body
        //     xtype: 'panel',
        //     html: 'message preview',
        //     width: 850
    }, {
        xtype: 'container',
        items: [{
            xtype: 'allStockForm'
        }, {
            xtype: 'allStockPanel'
        }, {
            layout: 'card',
            width: 760,
            height: 400,
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
    }]
});