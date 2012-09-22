Ext.define('RaxaEmr.Pharmacy.view.pharmacyDetails', {
    extend: 'Ext.window.Window',
    autoShow: true,
    height: 390,
    width: 623,
    titleCollapse: false,
    items: [{
        xtype: 'container',
        height: 345,
        layout: {
            type: 'absolute'
        },
        items: [ {
            xtype: 'displayfield',
            value: 'XYZ Pharmacy',
            x: 280,
            y: 10
        },
        {
            xtype: 'form',
            border: 'false',
            height: 120,
            width: 290,
            bodyPadding: 10,
            x: 10,
            y: 40,
            items: [{
                xtype: 'displayfield',
                value: 'Display Field',
                fieldLabel: 'PO no',
                labelWidth: 140,
                anchor: '100%'
            },
            {
                xtype: 'displayfield',
                value: 'Display Field',
                fieldLabel: 'PO Date',
                labelWidth: 140,
                anchor: '100%'
            },
            {
                xtype: 'displayfield',
                value: 'Display Field',
                fieldLabel: 'No of items ordered',
                labelWidth: 140,
                anchor: '100%'
            },
            {
                xtype: 'displayfield',
                value: 'Display Field',
                fieldLabel: 'Total Ordered Quantity',
                labelWidth: 140,
                anchor: '100%'
            },
            {
                xtype: 'displayfield',
                value: 'Display Field',
                fieldLabel: 'Total estimated Value',
                labelWidth: 140,
                anchor: '100%'
            }]
        },
        {
            xtype: 'form',
            height: 120,
            width: 290,
            bodyPadding: 10,
            x: 310,
            y: 40,
            items: [{
                xtype: 'displayfield',
                value: 'Display Field',
                fieldLabel: 'Receipt No',
                labelWidth: 140,
                anchor: '100%'
            },
            {
                xtype: 'displayfield',
                value: 'Display Field',
                fieldLabel: 'Receiving Date',
                labelWidth: 140,
                anchor: '100%'
            },
            {
                xtype: 'displayfield',
                value: 'Display Field',
                fieldLabel: 'No. Of Items Recieved',
                labelWidth: 140,
                anchor: '100%'
            },
            {
                xtype: 'displayfield',
                value: 'Display Field',
                fieldLabel: 'Total Received Qty',
                labelWidth: 140,
                anchor: '100%'
            },
            {
                xtype: 'displayfield',
                value: 'Display Field',
                fieldLabel: 'Total Value',
                labelWidth: 140,
                anchor: '100%'
            }]
        },
        {
            xtype: 'gridpanel',
            height: 170,
            width: 570,
            autoScroll: true,
            title: '',
            x: 20,
            y: 170,
            columns: [
            {
                xtype: 'gridcolumn',
                width: 54,
                dataIndex: 'string',
                text: '#'
            },
            {
                xtype: 'gridcolumn',
                width: 147,
                text: 'Name Of Drug'
            },
            {
                xtype: 'gridcolumn',
                width: 88,
                text: 'Ordered Qty'
            },
            {
                xtype: 'gridcolumn',
                width: 82,
                text: 'Received Qty'
            },
            {
                xtype: 'gridcolumn',
                autoShow: false,
                width: 96,
                text: 'Batch No'
            },
            {
                xtype: 'gridcolumn',
                text: 'Expiry Date'
            }
            ],
            viewConfig: {
                width: 562
            }
        }]
    }]
});