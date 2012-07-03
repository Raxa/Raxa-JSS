Ext.define('RaxaEmr.Pharmacy.view.addDrug', {
    extend: 'Ext.form.Panel',
    alias: 'widget.addDrug',
    height: 250,
    width: 667,
    layout: {
        type: 'absolute'
    },
    bodyPadding: 10,
    title: 'Add Drug',
            items: [
                {
                    xtype: 'textfield',
                    width: 240,
                    fieldLabel: 'Drug Name'
                },
                {
                    xtype: 'textfield',
                    width: 240,
                    fieldLabel: 'Manufacturer',
                    x: 10,
                    y: 40
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'regimen',
                    x: 320,
                    y: 40
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Quantity',
                    x: 320,
                    y: 70
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Packaging Unit',
                    x: 320,
                    y: 100
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Unit Price',
                    x: 320,
                    y: 130
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Drug Group',
                    x: 320,
                    y: 10
                },
                {
                    xtype: 'gridpanel',
                    width: 300,
                    x: 10,
                    y: 80,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            text: 'Acronym',
                            width: 100
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'Chemical',
                            width: 100
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'Strength',
                            width: 100
                        }
                    ]
                }
            ]

});
