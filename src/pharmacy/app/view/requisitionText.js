Ext.define('RaxaEmr.Pharmacy.view.requisitionText', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.requisitionText',
    layout: {
        type: 'hbox'
    },
    items: [
    {
        margin: 5,
        xtype: 'displayfield',
        value: 'New Requisition'
    },
    {
        margin: 5,
        xtype: 'combobox',
        width: 190,
        labelWidth: 90,
        id: "dispenseLocationPicker",
        store: Ext.create('RaxaEmr.Pharmacy.store.Locations', {
            storeId: 'dispenseLocations'
            }),
        fieldLabel: 'Your Location:',
        displayField: 'display',
        emptyText: 'Location'
    },
    {
        margin: 5,
        xtype: 'combobox',
        width: 190,
        labelWidth: 90,
        id: "stockLocationPicker",
        store: Ext.create('RaxaEmr.Pharmacy.store.Locations',{
            storeId: 'stockLocations'
        }),
        fieldLabel: 'Stock Location:',
        displayField: 'display',
        emptyText: 'Location'
    }]  
});