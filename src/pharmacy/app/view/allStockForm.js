Ext.define('RaxaEmr.Pharmacy.view.allStockForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.allStockForm',
    border: false,
    width: 780,
    activeItem: 0,
    title: 'Stock >> Overview',
    layout: {
        type: 'vbox'
    },
    items: [
        {
            layout: 'hbox',
            width: 780,
            border: true,
            items: [{
                margin: 5,
                xtype: 'combobox',
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
                icon: '../resources/img/delete.png',
                tooltip: 'Cancel',
                action: 'cancelAllStockLocationPicker'
            }]
        }
    ]
});