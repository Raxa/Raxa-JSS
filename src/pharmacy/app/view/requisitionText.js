Ext.define('RaxaEmr.Pharmacy.view.requisitionText', {
    extend: 'Ext.container.Container',
    alias: 'widget.requisitionText',
    layout: {
        type: 'vbox'
    },
    items: [
    {
        xtype: 'container',
        border: false,
        layout: 'vbox',
        items: [{
            margin: 5,
            xtype: 'combobox',
            labelWidth: 90,
            id: "dispenseLocationPicker",
            store: Ext.create('RaxaEmr.Pharmacy.store.Locations', {
                storeId: 'dispenseLocations'
                }),
            fieldLabel: 'Your Location',
            displayField: 'display',
            emptyText: 'Location',
            listeners: {
                'focus': {
                    fn: function (comboField) {
                        comboField.doQuery(comboField.allQuery, true);
                        comboField.expand();
                    },
                    scope: this
                }
            }
        },
        {
            margin: 5,
            xtype: 'combobox',
            labelWidth: 90,
            id: "stockLocationPicker",
            store: Ext.create('RaxaEmr.Pharmacy.store.Locations',{
                storeId: 'stockLocations'
            }),
            fieldLabel: 'Stock Location',
            displayField: 'display',
            emptyText: 'Location',
            listeners: {
                'focus': {
                    fn: function (comboField) {
                        comboField.doQuery(comboField.allQuery, true);
                        comboField.expand();
                    },
                    scope: this
                }
            }
        }]
    }]
});