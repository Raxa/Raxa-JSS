Ext.define('RaxaEmr.Pharmacy.view.goodsReceipt', {
    extend: 'Ext.container.Container',
    alias: 'widget.goodsdetails',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    autoScroll: true,
    items:[{
        xtype: 'pharmacytopbar'
    },{
        xtype: 'panel',
        height: 675,
        border: false,
        width: 765,
        layout: {
            type: 'absolute'
        },

        items: [{
            xtype: 'displayfield',
            value: 'Display New Order',
            x: 200,
            y: 20
        },{
            xtype: 'panel',
            height: 140,
            width: 540,
            border: 1,
            style: { 
                borderColor: '#010e0d',
                borderStyle: 'dashed',
                borderWidth: '1px'
            },
            layout: {
                type: 'absolute'
            },
            x: 200,
            y: 60,
            items: [{
                xtype: 'displayfield',
                width: 60,
                value: 'PO Detais',
                x: 30,
                y: 10
            },
            {
                xtype: 'radiofield',
                boxLabel: 'PO No',
                x: 20,
                y: 30
            },
            {
                xtype: 'combobox',
                width: 115,
                x: 125,
                y: 30
            },
            {
                xtype: 'radiofield',
                fieldLabel: '',
                boxLabel: 'Donation',
                x: 20,
                y: 50
            },
            {
                xtype: 'textfield',
                width: 190,
                fieldLabel: 'Receipt No',
                labelWidth: 70,
                x: 50,
                y: 80
            },
            {
                xtype: 'datefield',
                width: 190,
                fieldLabel: 'Date',
                labelWidth: 70,
                x: 50,
                y: 110
            },
            {
                xtype: 'form',
                height: 140,
                width: 290,
                border: false,
                bodyPadding: 10,
                x: 250,
                y: 0,
                items: [
                {
                    xtype: 'displayfield',
                    value: 'Vendor Name',
                    fieldLabel: 'Vendor',
                    anchor: '100%'
                },
                {
                    xtype: 'displayfield',
                    value: 'Line 1',
                    fieldLabel: 'Address',
                    anchor: '100%'
                },
                {
                    xtype: 'displayfield',
                    value: 'Line 2',
                    anchor: '100%'
                },
                {
                    xtype: 'displayfield',
                    width: 283,
                    value: 'Raxa',
                    fieldLabel: 'Person name',
                    anchor: '100%'
                },
                {
                    xtype: 'displayfield',
                    value: '9999999999',
                    fieldLabel: 'Contact',
                    anchor: '100%'
                }
                ]
            }]
        },
        {
            xtype: 'panel',
            height: 30,
            width: 540,
            layout: {
                type: 'absolute'
            },
            border: false,
            x: 200,
            y: 210,
            items: [{
                xtype: 'displayfield',
                value: 'Drug Details',
                x: 10,
                y: 0
            },
            {
                xtype: 'button',
                height: 30,
                width: 60,
                text: 'New',
                x: 260,
                y: 0
            },
            {
                xtype: 'button',
                height: 30,
                width: 60,
                text: 'Save',
                x: 330,
                y: 0
            },
            {
                xtype: 'button',
                height: 30,
                width: 60,
                text: 'Reset',
                x: 400,
                y: 0
            },
            {
                xtype: 'button',
                height: 30,
                width: 60,
                text: 'Cancel',
                x: 470,
                y: 0
            }]
        },
        {
            xtype: 'gridpanel',
            height: 173,
            width: 540,
            x: 200,
            y: 240,
            viewConfig: {

            },
            columns: [
            {
                xtype: 'gridcolumn',
                width: 65,
                text: 'S no'
            },
            {
                xtype: 'gridcolumn',
                width: 210,
                text: 'Name Of Drug'
            },
            {
                xtype: 'gridcolumn',
                width: 130,
                text: 'Qty Ordered'
            },
            {
                xtype: 'gridcolumn',
                width: 130,
                text: 'Qty Received',
                editable: true
            }]
        },{
            xtype: 'button',
            height: 30,
            width: 60,
            text: 'Save',
            x: 310,
            y: 630
        },
        {
            xtype: 'button',
            height: 30,
            width: 60,
            text: 'Cancel',
            x: 400,
            y: 630
        },
        {
            xtype: 'displayfield',
            value: '#2301  - Paracetamol Details',
            x: 200,
            y: 420
        },{
            xtype: 'gridpanel',
            height: 179,
            x: 200,
            y: 450,
            width: 350,
            columns: [
            {
                xtype: 'gridcolumn',
                dataIndex: 'string',
                editable: true,
                text: 'Batch no',
                width: 174
            },
            {
                xtype: 'datecolumn',
                dataIndex: 'date',
                editable: true,
                text: 'Expiry Date',
                width: 174
            }],
            plugins: [
            Ext.create('Ext.grid.plugin.CellEditing', {
                ptype: 'cellediting'
            })] 
        }]
    }]
});