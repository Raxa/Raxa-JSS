Ext.define('RaxaEmr.Pharmacy.view.allStockForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.allStockForm',
    border: false,
    height: 163,
    width: 743,
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
                    x: 250,
                    y: 40
                },
                {
                    xtype: 'button',
                    width: 90,
                    text: 'New Issue',
                    x: 350,
                    y: 40
                },
                {
                    xtype: 'button',
                    width: 90,
                    text: 'New Reciept',
                    x: 450,
                    y: 40
                },
                {
                    xtype: 'button',
                    width: 90,
                    text: 'New Drug',
                    x: 550,
                    y: 40
                },
                {
                    xtype: 'button',
                    width: 90,
                    text: 'New Drug Group',
                    x: 650,
                    y: 40
                },
                {
                    xtype: 'combobox',
                    width: 230,
                    fieldLabel: 'Group by',
                    emptyText: 'Location',
                    x: 10,
                    y: 40
                }
            ]

});