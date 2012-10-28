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