Ext.define('RaxaEmr.Pharmacy.view.requisitionText', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.requisitionText',
    height: 100,
    width: 743,
    layout: {
        type: 'absolute'
    },
    items: [
    {
        xtype: 'displayfield',
        value: 'New Requisition',
        x: 230,
        y: 10
    },
    {
        margin: 5,
        xtype: 'combobox',
        width: 190,
        labelWidth: 60,
        id: "dispenseLocationPicker",
        store: 'Locations',
        fieldLabel: 'Your Location:',
        displayField: 'display',
        emptyText: 'Location',
        x: 50,
        y: 50
    }]  
});