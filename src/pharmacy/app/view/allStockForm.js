Ext.define('RaxaEmr.Pharmacy.view.allStockForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.allStockForm',
    width: 780,
    border: false,
    items: [
    {
        layout: 'hbox',
        width: 780,
        border: false,
        items: [{
            margin: 5,
            xtype: 'combobox',
            id: 'allStockLocationPicker',
            fieldLabel: 'Your Location',
            store: Ext.create('RaxaEmr.Pharmacy.store.Locations',{
                storeId: 'currentLocations'
            }),
            displayField: 'display',
            queryMode: 'local',
            hideTrigger: true,
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