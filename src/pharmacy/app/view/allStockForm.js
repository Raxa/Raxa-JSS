Ext.define('RaxaEmr.Pharmacy.view.allStockForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.allStockForm',
    border: false,
    width: 760,
    margin: '10 0 0 0',
    activeItem: 0,
    layout: {
        type: 'vbox'
    },
    items: [
        // {
        //     layout: 'hbox',
        //     border: false,
        //     items: [
        //     {
        //         margin: 5,
        //         xtype: 'button',
        //         width: 100,
        //         text: 'New Requisition',
        //         id: 'newRequisitionButton',
        //         action: 'newRequisition'
        //     },
        //     {
        //         margin: 5,
        //         xtype: 'button',
        //         width: 90,
        //         text: 'New Issue',
        //         id: 'newIssueButton',
        //         action: 'newIssue'
        //     },
        //     {
        //         margin: 5,
        //         xtype: 'button',
        //         width: 90,
        //         text: 'New Receipt',
        //         id: 'newReceiptButton',
        //         action: 'newReceipt'
        //     },
        //     {
        //         margin: '5 5 5 400',
        //         xtype: 'button',
        //         width: 90,
        //         text: 'New Drug',
        //         id: 'newDrugButton',
        //         action: 'newDrug'
        //     },
        // //    {
        // //        margin: 5,
        // //        xtype: 'button',
        // //        width: 90,
        // //        text: 'New Drug Group',
        // //        id: 'newDrugGroupButton',
        // //        action: 'newDrugGroup'
        // //    },
        //     ]
        // },
        {   
            layout: 'hbox',
            border: true,
            items: [{
                margin: 5,
                xtype: 'combobox',
                // width: 300,
                // labelWidth: 80,
                id: 'allStockLocationPicker',
                fieldLabel: 'Your Location',
                store: Ext.create('RaxaEmr.Pharmacy.store.Locations',{
                    storeId: 'currentLocations'
                }),
                displayField: 'display',
                valueField: 'uuid',
                emptyText: 'All Locations'
            },
            {
                xtype: 'button',
                margin: 5,
                // height: 22,
                // width: 22,
                icon: '../resources/img/delete.png',
                tooltip: 'Cancel',
                action: 'cancelAllStockLocationPicker'
            }]
        }
    ]
});