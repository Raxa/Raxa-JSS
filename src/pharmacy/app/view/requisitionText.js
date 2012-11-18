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
        items: [
        {
            margin: 5,
            xtype: 'combobox',
            labelWidth: 90,
            id: "stockLocationPicker",
            store: 'Locations',
            fieldLabel: 'Stock Location',
            queryMode: 'local',
            hideTrigger: true,
            forceSelection: true,
            displayField: 'name',
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