Ext.define('RaxaEmr.Pharmacy.view.reports', {
    extend: 'Ext.container.Container',
    autoScroll: true,
    id: 'reports',
    alias: 'widget.reports',
    layout: 'auto',
    items:[{
        margin: '10 10 50 50',
        xtype: 'tabpanel',
        height: 550,
        width: 1200,
        activeTab: 0,
        tabPosition: 'left',
        items: [{
            margin: '10 0 0 10',
            xtype: 'panel',
            width: 701,
            title: 'Monthly Stock Receipts',
            items: [{
                xtype: 'fieldcontainer',
                width: 701,
                layout: {
                    align: 'stretch',
                    type: 'hbox'
                },
                fieldLabel: '',
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Month',
                    store: new Ext.data.SimpleStore({
                        fields: ['month'],
                        data: [
                        ['January'],
                        ['February'],
                        ['March'],
                        ['April'],
                        ['May'],
                        ['June'],
                        ['July'],
                        ['August'],
                        ['September'],
                        ['October'],
                        ['November'],
                        ['December']
                        ]
                    }),
                    displayField: 'month'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Type',
                    store: new Ext.data.SimpleStore({
                        fields: ['type'],
                        data: [
                        ['Purchased'],
                        ['OtherOptions']
                        ]
                    }),
                    margins: '0 0 0 6',
                    displayField: 'type'
                }]
            },
            {
                xtype: 'gridpanel',
                margin: '10 10 10 0',
                height: 500,
                title: 'Monthly Stock Report',
                columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'string',
                    text: 'S.No.'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'number',
                    text: 'PO. no.'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'date',
                    text: 'Vendor'
                },
                {
                    xtype: 'booleancolumn',
                    dataIndex: 'bool',
                    text: 'No. of Items'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Qty'
                },
                {
                    xtype: 'datecolumn',
                    text: 'Receiving Date'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Received by'
                }]
            }]
        },
        {
            xtype: 'panel',
            title: 'Daily Despensing Totals'
        },
        {
            xtype: 'panel',
            title: 'Stock Take Report'
        },
        {
            xtype: 'panel',
            title: 'Drug Dispensed Report'
        },
        {
            xtype: 'panel',
            width: 835,
            title: 'Cohort Drug Collections'
        },
        {
            xtype: 'panel',
            title: 'Monthy Reciept & Issuses Report'
        },
        {
            xtype: 'panel',
            title: 'AVR Drug Usage Report'
        }]
    }]
});