Ext.define('RaxaEmr.Pharmacy.view.goodsReceiptGrid', {
    extend: 'Ext.ux.ModalGrid',
    alias: 'widget.goodsReceiptGrid',
    styleHtmlContent: false,
    height: 250,
    width: 780 - 2, // Total pixels - Border
    store: Ext.create('RaxaEmr.Pharmacy.store.StockList',{
        autoLoad: false,
        storeId: 'newReceipt'
    }),
    selType: 'cellmodel',
    cellEditor: Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    }),
    viewConfig: {
        stripeRows: false
    },
    initComponent: function () {
        var receiptEditor = this;
        this.columns= [
        {
            xtype: 'rownumberer'
        },
        {
            xtype: 'gridcolumn',
            width: 200,
            dataIndex: 'drugName',
            text: 'Name Of drug',
            editor: {
                xtype: 'drugComboBox'
            }
        },
        // {
        //     xtype: 'gridcolumn',
        //     width: 80,
        //     text: 'Qty Sent',
        //     dataIndex: 'originalQuantity',
        //     hidden: true,
        //     editor: {
        //         xtype: 'numberfield',
        //         allowBlank: true,
        //         hidden: true,   // TODO: Is this field still submitting? should it be removed?
        //         decimalPrecision: 0,
        //         allowDecimals: false,
        //         minValue: 0,
        //         hideTrigger: true
        //     }
        // },
        {
            xtype: 'gridcolumn',
            width: 80,
            text: 'Qty Received',
            dataIndex: 'quantity',
            editable: true,
            editor: {
                xtype: 'numberfield',
                allowBlank: true,
                decimalPrecision: 0,
                allowDecimals: false,
                minValue: 0,
                hideTrigger: true
            }
        },
        {
            xtype: 'gridcolumn',
            width: 80,
            text: 'Shelf',
            dataIndex: 'roomLocation',
            editor: {
                xtype: 'textfield',
                allowBlank: true
            }
        },
        {
            xtype: 'gridcolumn',
            editable: true,
            text: 'Batch no',
            dataIndex: 'batch',
            width: 80,
            editor: {
                xtype: 'textfield',
                allowBlank: true
            }
        },
        {
            xtype: 'datecolumn',
            editable: true,
            text: 'Expiry Date',
            dataIndex: 'expiryDate',
            width: 80,
            format: 'd/m/y',
            editor: {
                xtype: 'datefield',
                allowBlank: false
            }
        },
        {
            xtype: 'gridcolumn',
            editable: true,
            text: 'Supplier',
            dataIndex: 'supplier',
            editor: {
                xtype: 'combobox',
                editable: true,
                minChars: 3,
                typeAhead: true,
                autoSelect: false,
                store: [
                'Shyam & Sons', 
                'Jagat Traders', 
                'Pankaj Medico Traders', 
                'Melaram & Brothers', 
                'Gurunanak Medical Stores', 
                'Saluja Medical Agencies', 
                'G. Medical Services', 
                'Nitin Medical Agency', 
                'Vimal Enterprises', 
                'Locost', 
                'CMSI'
                ],
                displayField: 'text',
                listeners: {
                    'focus': {
                        fn: function (comboField) {
                            comboField.expand();
                        },
                        scope: this
                    }
                }
            }
        }],
        this.plugins = [this.cellEditor];
        this.callParent(arguments);
    }
});
