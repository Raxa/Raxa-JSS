Ext.define('RaxaEmr.Pharmacy.view.newdrugform', {
    extend: 'Ext.window.Window',
    id: 'newDrugForm',
    alias: 'widget.newDrugForm',
    height: 250,
    width: 664,
    modal: true,
    title: 'New Drug',
    items: [
    {
        xtype: 'container',
        height: 210,
        layout: {
            align: 'stretch',
            type: 'hbox'
        },
        items: [
        {
            xtype: 'fieldcontainer',
            height: 120,
            width: 400,
            fieldLabel: '',
            flex: 1,
            items: [
            {
                xtype: 'textfield',
                width: 301,
                fieldLabel: 'Drug Name'
            },
            {
                xtype: 'textfield',
                width: 301,
                fieldLabel: 'Manufacturer'
            },
            {
                xtype: 'gridpanel',
                height: 157,
                width: 301,
                title: 'My Grid Panel',
                columns: [
                {
                    xtype: 'gridcolumn',
                    width: 98,
                    dataIndex: 'string',
                    text: 'Acronym'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'string',
                    text: 'Chemical'
                },
                {
                    xtype: 'gridcolumn',
                    width: 101,
                    dataIndex: 'string',
                    text: 'Strength'
                }],
                plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    ptype: 'cellediting'
                })
                ]
            }]
        },
        {
            xtype: 'container',
            flex: 1,
            items: [
            {
                xtype: 'fieldset',
                title: '',
                items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Drug Group',
                    anchor: '100%'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Regimen',
                    anchor: '100%'
                }]
            },
            {
                xtype: 'fieldset',
                height: 174,
                title: '',
                items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Quantity',
                    anchor: '100%',
                    minValue: 0
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Packaging Unit',
                    anchor: '100%',
                    minValue: 0
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Number Field',
                    anchor: '100%',
                    minValue: 0
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Total',
                    anchor: '100%',
                    minValue: 0
                }]
            }]
        }]
    }]
});
