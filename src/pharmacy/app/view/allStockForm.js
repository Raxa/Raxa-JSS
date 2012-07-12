Ext.define('RaxaEmr.Pharmacy.view.allStockForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.allStockForm',
    border: false,
    height: 163,
    width: 840,
    activeItem: 0,
    layout: {
        type: 'absolute'
    },
    bodyPadding: 10,
    items: [
    {
        xtype: 'button',
        width: 90,
        text: 'New P.O',
        x: 350,
        y: 40,
        id: 'newpobutton'
    },
    {
        xtype: 'button',
        width: 90,
        text: 'New Issue',
        x: 450,
        y: 40,
        id: 'newissuebutton'
    },
    {
        xtype: 'button',
        width: 90,
        text: 'New Reciept',
        x: 550,
        y: 40,
        id: 'newreceiptbutton'
    },
    {
        xtype: 'button',
        width: 90,
        text: 'New Drug',
        x: 650,
        y: 40,
        id: 'newdrugbutton'
    },
    {
        xtype: 'button',
        width: 90,
        text: 'New Drug Group',
        x: 750,
        y: 40,
        id: 'newdruggroupbutton'
    },
    {
        xtype: 'combobox',
        width: 230,
        labelWidth: 80,
        fieldLabel: 'Group by',
        emptyText: 'Location',
        x: 110,
        y: 40
    }]
});